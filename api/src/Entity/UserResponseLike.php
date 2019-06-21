<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource(
 *     	attributes={
 *     		"access_control": "is_granted('ROLE_ADMIN')"
 *	 	},
 *     	itemOperations={
 *     		"get": {
 *     			"access_control": "is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
 *	 		},
 *     		"delete": {
 *     			"access_control": "is_granted('ROLE_MODERATOR') or object.getLikeOwner() == user"
 *	 		}
 *	 	},
 *     	collectionOperations={
 *     		"get",
 *     		"post": {
 *     			"access_control": "is_granted('ROLE_USER')"
 *	 		}
 *	 	}
 * )
 * @ORM\Entity
 * @UniqueEntity(fields={"likeOwner", "likeResponse"})
 */
class UserResponseLike
{
	/**
	 * @ORM\Id
	 * @ORM\ManyToOne(targetEntity=User::class, inversedBy="userResponseLikes")
	 */
	private $likeOwner;

	/**
	 * @ORM\Id
	 * @ORM\ManyToOne(targetEntity=Response::class, inversedBy="responseLikes")
	 */
	private $likeResponse;

	public function getLikeOwner(): User
	{
		return $this->likeOwner;
	}

	public function setLikeOwner(User $likeOwner): self
	{
		$this->likeOwner = $likeOwner;
		return $this;
	}

	public function getLikeResponse(): Response
	{
		return $this->likeResponse;
	}

	public function setLikeResponse(Response $likeResponse): self
	{
		$this->likeResponse = $likeResponse;
		return $this;
	}
}
