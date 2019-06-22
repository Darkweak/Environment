<?php

namespace App\Subscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Subject;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class SubjectCreateSubscriber implements EventSubscriberInterface
{
	private $tokenStorage;

	public function __construct(TokenStorageInterface $tokenStorage)
	{
		$this->tokenStorage = $tokenStorage;
	}

	public static function getSubscribedEvents()
	{
		return [
			KernelEvents::VIEW => ['createSubject', EventPriorities::PRE_WRITE],
		];
	}

	public function createSubject(GetResponseForControllerResultEvent $event)
	{
		$subject = $event->getControllerResult();
		$method = $event->getRequest()->getMethod();

		if (!$subject instanceof Subject || Request::METHOD_POST !== $method) {
			return;
		}

		$user = $this->tokenStorage->getToken()->getUser();

		if (!$user instanceof User) {
			throw new BadRequestHttpException();
		}

		$subject->setSubjectCreator($user);
		$subject->setImageName($subject->getImageUrl());
	}
}
