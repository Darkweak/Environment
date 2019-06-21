<?php

namespace App\Subscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Response;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class ResponseCreateSubscriber implements EventSubscriberInterface
{
	private $tokenStorage;

	public function __construct(TokenStorageInterface $tokenStorage)
	{
		$this->tokenStorage = $tokenStorage;
	}

	public static function getSubscribedEvents()
	{
		return [
			KernelEvents::VIEW => ['createUserResponseLike', EventPriorities::PRE_WRITE],
		];
	}

	public function createUserResponseLike(GetResponseForControllerResultEvent $event)
	{
		$response = $event->getControllerResult();
		$method = $event->getRequest()->getMethod();

		if (!$response instanceof Response || Request::METHOD_POST !== $method) {
			return;
		}

		$user = $this->tokenStorage->getToken()->getUser();

		if (!$user instanceof User) {
			throw new BadRequestHttpException();
		}

		$response->setResponseCreator($user);
	}
}
