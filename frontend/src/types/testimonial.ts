import { IMandatoryDynamodbFields } from ".";

export enum EStars {
  Zero = "Zero",
  Half = "Half",
  One = "One",
  OneAndAHalf = "OneAndAHalf",
  Two = "Two",
  TwoAndAHalf = "TwoAndAHalf",
  Three = "Three",
  ThreeAndAHalf = "ThreeAndAHalf",
  Four = "Four",
  FourAndAHalf = "FourAndAHalf",
  Five = "Five",
}

export interface ITestimonialPutRequest {
  name: string;
  stars: EStars;
  title: string;
  comment: string;
  active: boolean;
}

export interface ITestimonial extends ITestimonialPutRequest, IMandatoryDynamodbFields { }
