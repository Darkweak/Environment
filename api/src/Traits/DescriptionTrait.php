<?php

namespace App\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait DescriptionTrait
{
	/**
	 * @ORM\Column(type="text")
	 * @Assert\NotBlank
	 * @Groups({"category_read_list", "subjects_read_list", "subject_read_item", "response_create_item", "profile_read"})
	 */
	public $description;

	public function getDescription(): string
	{
		return $this->description;
	}

	public function setDescription(string $description): self
	{
		$this->description = $description;
		return $this;
	}
}
