<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
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
 * @UniqueEntity(fields={"likeOwner", "likeSubject"})
 */
class UserSubjectLike
{
	/**
	 * @ORM\Id
	 * @ORM\ManyToOne(targetEntity=User::class, inversedBy="userSubjectLikes")
	 * @Groups({"subject_read_item"})
	 */
	private $likeOwner;

	/**
	 * @ORM\Id
	 * @ORM\ManyToOne(targetEntity=Subject::class, inversedBy="subjectLikes")
	 * @Groups({"profile_read"})
	 */
	private $likeSubject;

	public function getLikeOwner(): User
	{
		return $this->likeOwner;
	}

	public function setLikeOwner(User $likeOwner): self
	{
		$this->likeOwner = $likeOwner;
		return $this;
	}

	public function getLikeSubject(): Subject
	{
		return $this->likeSubject;
	}

	public function setLikeSubject(Subject $likeSubject): self
	{
		$this->likeSubject = $likeSubject;
		return $this;
	}
}
