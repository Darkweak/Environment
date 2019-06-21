<?php

namespace App\Subscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\Entity\UserSubjectLike;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class UserSubjectLikeSubscriber implements EventSubscriberInterface
{
	private $tokenStorage;

	public function __construct(TokenStorageInterface $tokenStorage)
	{
		$this->tokenStorage = $tokenStorage;
	}

	public static function getSubscribedEvents()
	{
		return [
			KernelEvents::VIEW => ['createUserSubjectLike', EventPriorities::PRE_WRITE],
		];
	}

	public function createUserSubjectLike(GetResponseForControllerResultEvent $event)
	{
		$usl = $event->getControllerResult();
		$method = $event->getRequest()->getMethod();

		if (!$usl instanceof UserSubjectLike || Request::METHOD_POST !== $method) {
			return;
		}

		$user = $this->tokenStorage->getToken()->getUser();

		if (!$user instanceof User) {
			throw new BadRequestHttpException();
		}

		$usl->setLikeOwner($user);
	}
}
