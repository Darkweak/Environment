<?php

namespace App\Subscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Base\Mailer;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class UserCreateSubscriber implements EventSubscriberInterface
{
	private $mailer;

	public function __construct(Mailer $mailer)
	{
		$this->mailer = $mailer;
	}

	public static function getSubscribedEvents()
	{
		return [
			KernelEvents::VIEW => ['userCreate', EventPriorities::PRE_WRITE]
		];
	}

	public function userCreate(GetResponseForControllerResultEvent $event): void
	{
		$user = $event->getControllerResult();

		if (!($user instanceof User && Request::METHOD_POST === $event->getRequest()->getMethod())) {
			return;
		}

		$user->setRoles(['ROLE_USER']);
		$token = hash('sha512',$user->getUsername().$user->getEmail().(new \DateTime())->format('Y-m-d H:i:s'));
		$user->setToken($token);
/*
		$this->mailer->send(
			$user,
			'register',
			'Bienvenue sur '.getenv('MARKETPLACE_NAME'),
			[
				'token' => $token
			]
		);*/
	}
}
