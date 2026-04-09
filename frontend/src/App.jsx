import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ShopPage from "./Pages/ShopPage";
import FeaturesPage from "./Pages/FeaturesPage";
import TestimonialPage from "./Pages/TestimonialPage";
import FAQPage from "./Pages/FAQPage";
import ContactUsPage from "./Pages/ContactUsPage";
import ProductPage from "./Pages/ProductPage";
import PrivacyPolicyPage from "./Pages/Policies/PrivacyPolicyPage";
import TermsAndConditionsPage from "./Pages/Policies/TermsAndConditionsPage";
import CancellationPolicyPage from "./Pages/Policies/CancellationPolicyPage";
import ReturnPolicyPage from "./Pages/Policies/ReturnPolicyPage";
import RefundPolicyPage from "./Pages/Policies/RefundPolicyPage";
import AdminHome from "./Pages/Admin/AdminHome";
import AdminMaincategoryPage from "./Pages/Admin/Maincategory/AdminMaincategoryPage";
import AdminMaincategoryCreatePage from "./Pages/Admin/Maincategory/AdminMaincategoryCreatePage";
import AdminMaincategoryUpdatePage from "./Pages/Admin/Maincategory/AdminMaincategoryUpdatePage";
import AdminSubcategoryPage from "./Pages/Admin/Subcategory/AdminSubcategoryPage";
import AdminSubcategoryCreatePage from "./Pages/Admin/Subcategory/AdminSubcategoryCreatePage";
import AdminSubcategoryUpdatePage from "./Pages/Admin/Subcategory/AdminSubcategoryUpdatePage";
import AdminBrandPage from "./Pages/Admin/Brand/AdminBrandPage";
import AdminBrandCreatePage from "./Pages/Admin/Brand/AdminBrandCreatePage";
import AdminBrandUpdatePage from "./Pages/Admin/Brand/AdminBrandUpdatePage";
import AdminFeaturesPage from "./Pages/Admin/Features/AdminFeaturesPage";
import AdminFeaturesCreatePage from "./Pages/Admin/Features/AdminFeaturesCreatePage";
import AdminFeaturesUpdatePage from "./Pages/Admin/Features/AdminFeaturesUpdatePage";
import AdminFAQPage from "./Pages/Admin/FAQ/AdminFAQPage";
import AdminFAQCreatePage from "./Pages/Admin/FAQ/AdminFAQCreatePage";
import AdminFAQUpdatePage from "./Pages/Admin/FAQ/AdminFAQUpdatePage";
import AdminSettingPage from "./Pages/Admin/Setting/AdminSettingPage";
import AdminProductPage from "./Pages/Admin/Product/AdminProductPage";
import AdminProductCreatePage from "./Pages/Admin/Product/AdminProductCreatePage";
import AdminProductUpdatePage from "./Pages/Admin/Product/AdminProductUpdatePage";
import ErrorPage from "./Pages/ErrorPage";
import SignUpPage from "./Pages/User/SignUpPage";
import LogInPage from "./Pages/User/LogInPage";
import ProfilePage from "./Pages/User/ProfilePage";
import CartPage from "./Pages/User/CartPage";
import CheckoutPage from "./Pages/User/CheckoutPage";
import OrderConfirmation from "./Pages/User/OrderConfirmation";
import AdminNewsletterPage from "./Pages/Admin/Newsletter/AdminNewsletterPage";
import AdminContactUsPage from "./Pages/Admin/ContactUs/AdminContactUsPage";
import AdminContactUsShowPage from "./Pages/Admin/ContactUs/AdminContactUsShowPage";
import AdminCheckoutPage from "./Pages/Admin/Checkout/AdminCheckoutPage";
import AdminCheckoutShowPage from "./Pages/Admin/Checkout/AdminCheckoutShowPage";
import AdminUserPage from "./Pages/Admin/User/AdminUserPage";
import AdminUserUpdatePage from "./Pages/Admin/User/AdminUserUpdatePage";
import AdminUserCreatePage from "./Pages/Admin/User/AdminUserCreatePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/testimonial" element={<TestimonialPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/product/:_id" element={<ProductPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
          <Route
            path="/termsandcondition"
            element={<TermsAndConditionsPage />}
          />
          <Route
            path="/cancellationpolicy"
            element={<CancellationPolicyPage />}
          />
          <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
          <Route path="/refundpolicy" element={<RefundPolicyPage />} />

          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />

          {localStorage.getItem("login") ? (
            <>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
            </>
          ) : null}

          {localStorage.getItem("login") &&
          localStorage.getItem("role") !== "Buyer" ? (
            <>
              <Route path="/admin" element={<AdminHome />} />
              <Route
                path="/admin/maincategory"
                element={<AdminMaincategoryPage />}
              />
              <Route
                path="/admin/maincategory/create"
                element={<AdminMaincategoryCreatePage />}
              />
              <Route
                path="/admin/maincategory/update/:_id"
                element={<AdminMaincategoryUpdatePage />}
              />

              <Route
                path="/admin/subcategory"
                element={<AdminSubcategoryPage />}
              />
              <Route
                path="/admin/subcategory/create"
                element={<AdminSubcategoryCreatePage />}
              />
              <Route
                path="/admin/subcategory/update/:_id"
                element={<AdminSubcategoryUpdatePage />}
              />

              <Route path="/admin/brand" element={<AdminBrandPage />} />
              <Route
                path="/admin/brand/create"
                element={<AdminBrandCreatePage />}
              />
              <Route
                path="/admin/brand/update/:_id"
                element={<AdminBrandUpdatePage />}
              />

              <Route path="/admin/product" element={<AdminProductPage />} />
              <Route
                path="/admin/product/create"
                element={<AdminProductCreatePage />}
              />
              <Route
                path="/admin/product/update/:_id"
                element={<AdminProductUpdatePage />}
              />

              <Route path="/admin/features" element={<AdminFeaturesPage />} />
              <Route
                path="/admin/features/create"
                element={<AdminFeaturesCreatePage />}
              />
              <Route
                path="/admin/features/update/:_id"
                element={<AdminFeaturesUpdatePage />}
              />

              <Route path="/admin/faq" element={<AdminFAQPage />} />
              <Route
                path="/admin/faq/create"
                element={<AdminFAQCreatePage />}
              />
              <Route
                path="/admin/faq/update/:_id"
                element={<AdminFAQUpdatePage />}
              />

              <Route path="/admin/setting" element={<AdminSettingPage />} />

              <Route
                path="/admin/newsletter"
                element={<AdminNewsletterPage />}
              />

              <Route path="/admin/contactus" element={<AdminContactUsPage />} />
              <Route
                path="/admin/contactus/show/:_id"
                element={<AdminContactUsShowPage />}
              />

              <Route path="/admin/checkout" element={<AdminCheckoutPage />} />
              <Route
                path="/admin/checkout/show/:_id"
                element={<AdminCheckoutShowPage />}
              />

              {localStorage.getItem("role") === "Super Admin" ? (
                <>
                  <Route path="/admin/users" element={<AdminUserPage />} />
                  <Route
                    path="/admin/users/create"
                    element={<AdminUserCreatePage />}
                  />
                  <Route
                    path="/admin/users/update/:_id"
                    element={<AdminUserUpdatePage />}
                  />
                </>
              ) : null}
            </>
          ) : null}

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
