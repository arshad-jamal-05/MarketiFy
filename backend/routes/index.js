const Router = require("express").Router();

const MaincategoryRouter = require("./MaincategoryRoutes");
const SubcategoryRouter = require("./SubcategoryRoutes");
const BrandRouter = require("./BrandRoutes");
const ProductRouter = require("./ProductRoutes");
const FeaturesRouter = require("./FeaturesRoutes");
const FAQRouter = require("./FAQRoutes");
const SettingRouter = require("./SettingRoutes");
const UserRouter = require("./UserRoutes");
const CartRouter = require("./CartRoutes");
const WishlistRouter = require("./WishlistRoutes");
const CheckoutRouter = require("./CheckoutRoutes");
const NewsletterRouter = require("./NewsletterRoutes");
const ContactUsRouter = require("./ContactUsRoutes");

Router.use("/maincategory", MaincategoryRouter);
Router.use("/subcategory", SubcategoryRouter);
Router.use("/brand", BrandRouter);
Router.use("/product", ProductRouter);
// Router.use("/features", FeaturesRouter);
Router.use("/feature", FeaturesRouter);
Router.use("/faq", FAQRouter);
Router.use("/setting", SettingRouter);
Router.use("/user", UserRouter);
Router.use("/cart", CartRouter);
Router.use("/wishlist", WishlistRouter);
Router.use("/checkout", CheckoutRouter);
Router.use("/newsletter", NewsletterRouter);
Router.use("/contactus", ContactUsRouter);

module.exports = Router;
