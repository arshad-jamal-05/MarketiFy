import { combineReducers } from "@reduxjs/toolkit";
import MaincategoryReducer from "./MaincategoryReducer";
import SubcategoryReducer from "./SubcategoryReducer";
import BrandReducer from "./BrandReducer";
import ProductReducer from "./ProductReducer";
import FeaturesReducer from "./FeaturesReducer";
import FAQReducer from "./FAQReducer";
import SettingReducer from "./SettingReducer";
import CartReducer from "./CartReducer";
import WishlistReducer from "./WishlistReducer";
import CheckoutReducer from "./CheckoutReducer";
import NewsletterReducer from "./NewsletterReducer";
import ContactUsReducer from "./ContactUsReducer";
import UserReducer from "./UserReducer";
import TestimonialReducer from "./TestimonialReducer";

export default combineReducers({
  MaincategoryStateData: MaincategoryReducer,
  SubcategoryStateData: SubcategoryReducer,
  BrandStateData: BrandReducer,
  ProductStateData: ProductReducer,
  FeaturesStateData: FeaturesReducer,
  FAQStateData: FAQReducer,
  SettingStateData: SettingReducer,
  CartStateData: CartReducer,
  WishlistStateData: WishlistReducer,
  CheckoutStateData: CheckoutReducer,
  NewsletterStateData: NewsletterReducer,
  ContactUsStateData: ContactUsReducer,
  UserStateData: UserReducer,
  TestimonialStateData: TestimonialReducer,
});
