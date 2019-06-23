<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\FindMe;
use App\Repository\UserRepository;
use App\Traits\IdTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     	attributes={
 *     		"access_control": "is_granted('ROLE_USER')"
 *	 	},
 *     	itemOperations={
 *     		"get"
 *	 	},
 *     	collectionOperations={
 *     		"get": {
 *     			"access_control": "is_granted('ROLE_ADMIN')"
 *	 		},
 *     		"get_me": {
 * 				"normalization_context": {"groups": {"profile_read"}},
 *         		"method"="GET",
 *         		"path"="/me",
 *         		"controller"=FindMe::class
 *	 		},
 *     		"post": {
 *     			"access_control": "is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 * 				"normalization_context": {"groups": {"user_read_create"}},
 * 				"denormalization_context": {"groups": {"user_write_create"}}
 *	 		}
 *	 	}
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="users")
 */
class User implements UserInterface
{
	use IdTrait;

	/**
	 * @ORM\Column(unique=true)
	 * @Assert\NotBlank
	 * @Groups({"category_read_list", "subjects_read_list", "subject_read_item", "user_read_create", "user_write_create", "response_create_item", "profile_read"})
	 */
	private $username;

	/**
	 * @ORM\Column(unique=true)
	 * @Assert\NotBlank
	 * @Assert\Email
	 * @Groups({"user_read_create", "user_write_create", "profile_read"})
	 */
	private $email;

	/**
	 * @ORM\Column
	 * @Assert\NotBlank
	 * @Groups({"user_read_create", "user_write_create", "profile_read"})
	 */
	private $password;

	/**
	 * @ORM\Column(nullable=true)
	 */
	private $token;

	/**
	 * @ORM\Column(type="json", nullable=true)
	 */
	private $roles = [];

	/**
	 * @ORM\OneToMany(targetEntity=Subject::class, mappedBy="subjectCreator")
	 * @Groups({"profile_read"})
	 */
	private $subjectsOwned;

	/**
	 * @ORM\OneToMany(targetEntity=Response::class, mappedBy="responseCreator")
	 * @Groups({"profile_read"})
	 */
	private $subjectResponses;

	/**
	 * @ORM\OneToMany(targetEntity=UserSubjectLike::class, mappedBy="likeOwner")
	 * @Groups({"profile_read"})
	 */
	private $userSubjectLikes;

	public function __construct()
	{
		$this->subjectsOwned = new ArrayCollection();
		$this->subjectResponses = new ArrayCollection();
		$this->userSubjectLikes = new ArrayCollection();
	}

	public function getUsername(): string
	{
		return $this->username;
	}

	public function setUsername(string $username): self
	{
		$this->username = $username;
		return $this;
	}

	public function getEmail(): string
	{
		return $this->email;
	}

	public function setEmail(string $email): self
	{
		$this->email = $email;
		return $this;
	}

	public function getPassword(): string
	{
		return $this->password;
	}

	public function setPassword(string $password): self
	{
		$this->password = $password;
		return $this;
	}

	public function getToken(): ?string
	{
		return $this->token;
	}

	public function setToken(?string $token): self
	{
		$this->token = $token;
		return $this;
	}

	public function getRoles(): array
	{
		return array_merge($this->roles, ['ROLE_USER']);
	}

	public function setRoles(?array $roles): self
	{
		$this->roles = $roles;
		return $this;
	}

	public function addRole(string $role): self
	{
		if (!\in_array($role, $this->roles)) {
			\array_push($this->roles, $role);
		}
		return $this;
	}

	public function removeRole(string $role): self
	{
		if (false !== $key = array_search($role, $this->roles)) {
			array_splice($this->roles, $key, 1);
		}
		return $this;
	}

	public function getSubjectsOwned(): Collection
	{
		return $this->subjectsOwned;
	}

	public function setSubjectsOwned(Collection $subjectsOwned): self
	{
		$this->subjectsOwned = $subjectsOwned;
		return $this;
	}

	public function addSubjectOwned(Subject $subject): self
	{
		if (!$this->subjectsOwned->contains($subject)) {
			$this->subjectsOwned->add($subject);
		}
		return $this;
	}

	public function removeSubjectOwned(Subject $subject): self
	{
		$this->subjectsOwned->removeElement($subject);
		return $this;
	}

	public function getSubjectResponses(): Collection
	{
		return $this->subjectResponses;
	}

	public function setSubjectResponses(Collection $subjectResponses): self
	{
		$this->subjectResponses = $subjectResponses;
		return $this;
	}

	public function addSubjectResponses(Response $subject): self
	{
		if (!$this->subjectResponses->contains($subject)) {
			$this->subjectResponses->add($subject);
		}
		return $this;
	}

	public function removeSubjectResponses(Response $subject): self
	{
		$this->subjectResponses->removeElement($subject);
		return $this;
	}

	public function getUserSubjectLikes(): Collection
	{
		return $this->userSubjectLikes;
	}

	public function setUserSubjectLikes(Collection $userSubjectLikes): self
	{
		$this->userSubjectLikes = $userSubjectLikes;
		return $this;
	}

	public function addUserSubjectLikes(UserSubjectLike $userSubjectLikes): self
	{
		if (!$this->userSubjectLikes->contains($userSubjectLikes)) {
			$this->userSubjectLikes->add($userSubjectLikes);
		}
		return $this;
	}

	public function removeUserSubjectLikes(UserSubjectLike $userSubjectLikes): self
	{
		$this->userSubjectLikes->removeElement($userSubjectLikes);
		return $this;
	}

	public function getSalt(): ?string
	{
		return null;
	}

	public function eraseCredentials(): void
	{
	}
}
