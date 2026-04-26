class Director < ApplicationRecord
  before_validation :ensure_slug

  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true

  # Movies store a free-text `director` column whose value matches Director#name
  # (e.g. "Kurosawa", "Powell and Pressburger"). Filmography is the set of
  # movies where the column equals this director's name.
  def films
    Movie.where(director: name).order(:year)
  end

  private

  def ensure_slug
    self.slug = name.parameterize if slug.blank? && name.present?
  end
end
