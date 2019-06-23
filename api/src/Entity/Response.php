<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Traits\DescriptionTrait;
use App\Traits\IdTrait;
use App\Traits\NameTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     	attributes={
 *     		"access_control": "is_granted('ROLE_ADMIN')"
 *	 	},
 *     	itemOperations={
 *     		"get": {
 *     			"access_control": "is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
 *	 		},
 *     		"put": {
 *     			"access_control": "is_granted('ROLE_MODERATOR') or object.getResponseCreator() == user"
 *	 		},
 *     		"delete": {
 *     			"access_control": "is_granted('ROLE_MODERATOR') or object.getResponseCreator() == user"
 *	 		}
 *	 	},
 *     	collectionOperations={
 *     		"get",
 *     		"post": {
 *     			"access_control": "is_granted('ROLE_USER')",
 * 				"normalization_context": {"groups": {"response_create_item"}}
 *	 		}
 *	 	}
 * )
 * @ORM\Entity
 */
class Response
{
	use IdTrait;
	use DescriptionTrait;

	/**
	 * @ORM\ManyToOne(targetEntity=User::class, inversedBy="subjectResponses")
	 * @Groups({"subject_read_item", "response_create_item"})
	 */
	private $responseCreator;

	/**
	 * @ORM\ManyToOne(targetEntity=Subject::class, inversedBy="responses")
	 * @Groups({"profile_read"})
	 */
	private $subject;

	public function getResponseCreator(): User
	{
		return $this->responseCreator;
	}

	public function setResponseCreator(User $responseCreator): self
	{
		$this->responseCreator = $responseCreator;
		return $this;
	}

	public function getSubject(): Subject
	{
		return $this->subject;
	}

	public function setSubject(Subject $subject): self
	{
		$this->subject = $subject;
		return $this;
	}
}
