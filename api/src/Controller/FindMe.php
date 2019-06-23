<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class FindMe
{
	private $tokenStorage;

	public function __construct(TokenStorageInterface $tokenStorage)
	{
		$this->tokenStorage = $tokenStorage;
	}

	public function __invoke()
	{
		$user = $this->tokenStorage->getToken()->getUser();

		if (!$user instanceof User) {
			throw new BadRequestHttpException();
		}

		return $user;
	}
}
