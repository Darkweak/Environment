<?php

namespace App\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait ImageTrait
{
	/**
	 * @ORM\Column
	 * @Assert\NotBlank
	 * @Groups({"category_read_list", "subjects_read_list"})
	 */
	public $imageUrl;

	/**
	 * @ORM\Column
	 * @Assert\NotBlank
	 * @Groups({"category_read_list", "subjects_read_list"})
	 */
	public $imageName;

	public function getImageUrl(): string
	{
		return $this->imageUrl;
	}

	public function setImageUrl(string $imageUrl): self
	{
		$this->imageUrl = $imageUrl;
		return $this;
	}

	public function getImageName(): string
	{
		return $this->imageName;
	}

	public function setImageName(string $imageName): self
	{
		$this->imageName = $imageName;
		return $this;
	}
}
