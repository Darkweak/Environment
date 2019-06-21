<?php

declare(strict_types=1);

namespace App\Subscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Serializer\SerializerInterface;

class JWTGenerationSubscriber
{
	private $serializer;

	public function __construct(SerializerInterface $serializer)
	{
		$this->serializer = $serializer;
	}

	public function onJWTCreated(JWTCreatedEvent $event)
	{
		$payload = $event->getData();
		$payload['exp'] = time() + (60 * 60 * 24 * 30 * 6); // six months token lifetime
		$payload['id'] = $event->getUser()->getId(); // get id current user

		$event->setData($payload);
	}
}
