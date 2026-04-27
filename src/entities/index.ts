/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType date */
  publishDate?: Date | string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
}


/**
 * Collection ID: casestudies
 * Interface for CaseStudies
 */
export interface CaseStudies {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  industry?: string;
  /** @wixFieldType text */
  problem?: string;
  /** @wixFieldType text */
  solution?: string;
  /** @wixFieldType text */
  result?: string;
  /** @wixFieldType text */
  roiMetrics?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  beforeChart?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  afterChart?: string;
}


/**
 * Collection ID: contactinquiries
 * Interface for ContactInquiries
 */
export interface ContactInquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
}


/**
 * Collection ID: industries
 * Interface for Industries
 */
export interface Industries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  industryName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  industryImage?: string;
  /** @wixFieldType text */
  shortSummary?: string;
  /** @wixFieldType text */
  industryChallenges?: string;
}


/**
 * Collection ID: pricingplans
 * Interface for PricingPlans
 */
export interface PricingPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  planName?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  currency?: string;
  /** @wixFieldType text */
  featuresSummary?: string;
  /** @wixFieldType url */
  ctaLink?: string;
  /** @wixFieldType text */
  ctaText?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType boolean */
  isMostPopular?: boolean;
}


/**
 * Collection ID: products
 * @catalog This collection is an eCommerce catalog
 * Interface for Products
 */
export interface Products {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  features?: string;
}


/**
 * Collection ID: resources
 * Interface for Resources
 */
export interface Resources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  resourceType?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  downloadUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnail?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceImage?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}
