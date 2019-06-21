<?php

namespace App\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait NameTrait
{
	/**
	 * @ORM\Column
	 * @Assert\NotBlank
	 * @Groups({"category_read_list", "subjects_read_list", "subject_read_item"})
	 */
	public $name;

	public function getName(): string
	{
		return $this->name;
	}

	public function setName(string $name): self
	{
		$this->name = $name;
		return $this;
	}
}
