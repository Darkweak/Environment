<?php

namespace App\Base;

use App\Entity\User;
use Twig\Environment;

class Mailer
{
	private $environment;
	private $mailer;

	public function __construct(Environment $environment, \Swift_Mailer $mailer)
	{
		$this->environment = $environment;
		$this->mailer = $mailer;
	}

	public function send(User $user, string $template, string $title, array $params = []): void
	{
		$message = (new \Swift_Message($title))
			->setFrom(getenv('NOTIFICATION_EMAIL'))
			->setReplyTo(getenv('NOTIFICATION_EMAIL'))
			->setTo($user->getEmail())
			->setBody(
				$this->environment->render(
					sprintf('%s.html.twig', $template),
					array_merge([
						'BASE_URL' => getenv('BASE_URL'),
						'MARKETPLACE' => getenv('MARKETPLACE_NAME')
					], $params)
				)
			)->setContentType("text/html");
		$this->mailer->send($message);
	}
}
