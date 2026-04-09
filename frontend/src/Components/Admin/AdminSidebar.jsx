import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="list-group">
      <Link
        to="/admin"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-house-door fs-4"></i>
        <span className="float-end">Home</span>
      </Link>
      <Link
        to="/admin/maincategory"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-card-list fs-4"></i>
        <span className="float-end">Maincategory</span>
      </Link>
      <Link
        to="/admin/subcategory"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-card-list fs-4"></i>
        <span className="float-end">Subcategory</span>
      </Link>
      <Link
        to="/admin/brand"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-card-list fs-4"></i>
        <span className="float-end">Brand</span>
      </Link>
      <Link
        to="/admin/product"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-list-ul fs-4"></i>
        <span className="float-end">Product</span>
      </Link>
      <Link
        to="/admin/features"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-bookmark-check fs-4"></i>
        <span className="float-end">Features</span>
      </Link>
      <Link
        to="/admin/faq"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-question-circle fs-4"></i>
        <span className="float-end">FAQs</span>
      </Link>
      <Link
        to="/admin/setting"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-gear fs-4"></i>
        <span className="float-end">Setting</span>
      </Link>
      <Link
        to="/admin/newsletter"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-envelope-open fs-4"></i>
        <span className="float-end">Newsletter</span>
      </Link>
      <Link
        to="/admin/contactus"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-telephone fs-4"></i>
        <span className="float-end">Contact Us</span>
      </Link>
      <Link
        to="/admin/checkout"
        className="list-group-item list-group-item-action active mb-1"
        aria-current="true"
      >
        <i className="bi bi-bag-check fs-4"></i>
        <span className="float-end">Checkout</span>
      </Link>
      {localStorage.getItem("role") === "Super Admin" ? (
        <Link
          to="/admin/users"
          className="list-group-item list-group-item-action active mb-1"
          aria-current="true"
        >
          <i className="bi bi-people fs-4"></i>
          <span className="float-end">Users</span>
        </Link>
      ) : null}
    </div>
  );
}
