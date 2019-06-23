<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class ChangePassword
{
	private $encoder;
	private $manager;
	private $tokenStorage;

	public function __construct(EntityManagerInterface $manager, UserPasswordEncoderInterface $encoder, TokenStorageInterface $tokenStorage)
	{
		$this->encoder = $encoder;
		$this->manager = $manager;
		$this->tokenStorage = $tokenStorage;
	}

	public function __invoke(Request $request)
	{
		$user = $this->tokenStorage->getToken()->getUser();

		if (!$user instanceof User) {
			throw new BadRequestHttpException();
		}

		try {
			$content = \json_decode($request->getContent());

			$oldPassword = $content->oldPassword;
			$newPassword = $content->newPassword;
		} catch (\Exception $e) {
			throw new BadRequestHttpException();
		}

		if (!$this->encoder->isPasswordValid($user, $oldPassword)) {
			throw new BadRequestHttpException();
		}

		$user->setPassword($this->encoder->encodePassword($user, $newPassword));
		$this->manager->flush();

		return new JsonResponse();
	}
}
