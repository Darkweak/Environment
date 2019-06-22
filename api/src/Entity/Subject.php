<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Traits\DescriptionTrait;
use App\Traits\IdTrait;
use App\Traits\ImageTrait;
use App\Traits\NameTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     	attributes={
 *     		"access_control": "is_granted('ROLE_ADMIN')",
*     		"order"={"id": "ASC"}
 *	 	},
 *     	itemOperations={
 *     		"get": {
 *     			"access_control": "is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 * 				"normalization_context": {"groups": {"subject_read_item"}}
 *	 		},
 *     		"put": {
 *     			"access_control": "is_granted('ROLE_MODERATOR') or object.getSubjectCreator() == user"
 *	 		},
 *     		"delete": {
 *     			"access_control": "is_granted('ROLE_MODERATOR') or object.getSubjectCreator() == user"
 *	 		}
 *	 	},
 *     	collectionOperations={
 *     		"get": {
 *     			"access_control": "is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 * 				"normalization_context": {"groups": {"subjects_read_list"}}
 *	 		},
 *     		"post": {
 *     			"access_control": "is_granted('ROLE_USER')"
 *	 		}
 *	 	}
 * )
 * @ORM\Entity
 *
 * @ApiFilter(SearchFilter::class, properties={"name": "ipartial", "description": "ipartial", "category.name": "iexact", "subjectCreator.username": "ipartial"})
 */
class Subject
{
	use IdTrait;
	use NameTrait;
	use DescriptionTrait;
	use ImageTrait;

	/**
	 * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="subjects")
	 * @Groups({"subject_read_item"})
	 */
	private $category;

	/**
	 * @ORM\ManyToOne(targetEntity=User::class, inversedBy="subjectsOwned")
	 * @Groups({"category_read_list", "subjects_read_list", "subject_read_item"})
	 */
	private $subjectCreator;

	/**
	 * @ORM\OneToMany(targetEntity=UserSubjectLike::class, mappedBy="likeSubject")
	 * @Groups({"subject_read_item"})
	 */
	private $subjectLikes;

	/**
	 * @ORM\OneToMany(targetEntity=Response::class, mappedBy="subject")
	 * @Groups({"subject_read_item"})
	 */
	private $responses;

	public function __construct()
	{
		$this->subjectLikes = new ArrayCollection();
		$this->responses = new ArrayCollection();
	}

	public function getCategory()
	{
		return $this->category;
	}

	public function setCategory($category): self
	{
		$this->category = $category;
		return $this;
	}

	public function getSubjectCreator(): User
	{
		return $this->subjectCreator;
	}

	public function setSubjectCreator(User $subjectCreator): self
	{
		$this->subjectCreator = $subjectCreator;
		return $this;
	}

	public function getSubjectLikes(): Collection
	{
		return $this->subjectLikes;
	}

	public function setSubjectLikes(Collection $subjectLikes): self
	{
		$this->subjectLikes = $subjectLikes;

		return $this;
	}

	public function addSubjectLike(UserSubjectLike $userSubjectLike): self
	{
		if (!$this->subjectLikes->contains($userSubjectLike)) {
			$this->subjectLikes->add($userSubjectLike);
		}
		return $this;
	}

	public function removeSubjectLike(UserSubjectLike $userSubjectLike): self
	{
		$this->subjectLikes->removeElement($userSubjectLike);
		return $this;
	}

	public function getResponses(): Collection
	{
		return $this->responses;
	}

	public function setResponses(Collection $responses): self
	{
		$this->responses = $responses;
		return $this;
	}

	public function addResponse(Response $response): self
	{
		if (!$this->responses->contains($response)) {
			$this->responses->add($response);
		}
		return $this;
	}

	public function remvoeResponse(Response $response): self
	{
		$this->responses->removeElement($response);
		return $this;
	}

	/**
	 * @Groups({"category_read_list", "subjects_read_list", "subject_read_item"})
	 */
	public function getResponsesCount(): int
	{
		return \count($this->responses);
	}

	/**
	 * @Groups({"subject_read_item"})
	 */
	public function getLikesCount(): int
	{
		return \count($this->subjectLikes);
	}
}
