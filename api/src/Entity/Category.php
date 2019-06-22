<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Traits\IdTrait;
use App\Traits\NameTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     	attributes={
 *     		"access_control": "is_granted('ROLE_ADMIN')",
 *     		"order"={"id": "DESC", "subjects.id": "ASC"}
 *	 	},
 *     	itemOperations={
 *     		"get": {
 *     			"access_control": "is_granted('IS_AUTHENTICATED_ANONYMOUSLY')"
 *	 		},
 *     		"put": {
 *     			"access_control": "is_granted('ROLE_MODERATOR')"
 *	 		},
 *     		"delete": {
 *     			"access_control": "is_granted('ROLE_MODERATOR')"
 *	 		}
 *	 	},
 *     	collectionOperations={
 *     		"get": {
 *     			"access_control": "is_granted('IS_AUTHENTICATED_ANONYMOUSLY')",
 * 				"normalization_context": {"groups": {"category_read_list"}}
 *	 		},
 *     		"post": {
 *     			"access_control": "is_granted('ROLE_ADMIN')"
 *	 		}
 *	 	}
 * )
 * @ORM\Entity
 *
 * @ApiFilter(SearchFilter::class, properties={"name": "ipartial", "description": "ipartial", "subjects.name": "ipartial"})
 */
class Category
{
	use IdTrait;
	use NameTrait;

	/**
	 * @ORM\Column
	 * @Groups({"category_read_list"})
	 */
	private $color;

	/**
	 * @ORM\OneToMany(targetEntity=Subject::class, mappedBy="category")
	 * @Groups({"category_read_list"})
	 */
	private $subjects;

	public function __construct()
	{
		$this->subjects = new ArrayCollection();
	}

	public function getColor()
	{
		return $this->color;
	}

	public function setColor($color): self
	{
		$this->color = $color;
		return $this;
	}

	public function getSubjects()
	{
		return $this->subjects;
	}

	public function setSubjects($subjects): self
	{
		$this->subjects = $subjects;
		return $this;
	}

	public function addSubject(Subject $subject): self
	{
		if (!$this->subjects->contains($subject)) {
			$this->subjects->add($subject);
		}
		return $this;
	}

	public function removeSubject(Subject $subject): self
	{
		$this->subjects->removeElement($subject);
		return $this;
	}
}
