import { useForm } from "react-hook-form";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";


function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = [
    "",
    "Hand Tools",
    "Cables and Wires",
    "Connectors",
    "Enclosures and Storage",
    "Personal Protective Equipment",
    "Test and Measurement",
    "Lighting",
    "Automation and Control",
    "Semiconductors",
    "Switches",
    "Passive Components",
    "Fasteners and Fixings",
  ];
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      message("Product created successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("price", data.price);
    formData.set("description", data.description);
    formData.set("category", category);
    formData.set("stock", data.stock);
    formData.set("seller", data.seller);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(newProduct(formData));
    reset();
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"New Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div
          className="col-md-9"
          style={{ marginTop: "5%", marginBottom: "10%" }}
        >
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(255, 105, 180, 0.5), rgba(0, 191, 255, 0.5))",
                  borderRadius: "10px",
                }}
                onSubmit={handleSubmit(submitHandler)}
              >
                <h1 className="mb-4">New Product</h1>

                {/* <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="name_field">Name:</label>
                  <input
                    type="name"
                    className={`form-control ${errors.name && "is-invalid"}`}
                    {...register("name", {
                      required: "Name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("name");
                    }}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                {/* <div className="form-group">
                  <label htmlFor="price_field">Price</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="price_field">Price:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.price && "is-invalid"}`}
                    // {...register("price", {
                    //   required: "Price is Required",
                    // })}
                    {...register("price", {
                      required: "Price is Required",
                      pattern: {
                        value: /^[0-9.]+$/,
                        message: "Invalid Price",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("price");
                    }}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">
                      {errors.price.message}
                    </div>
                  )}
                </div>

                {/* <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div> */}

                <div className="form-group">
                  <label htmlFor="description_field">Description:</label>
                  <textarea
                    rows="8"
                    className={`form-control ${
                      errors.description && "is-invalid"
                    }`}
                    {...register("description", {
                      required: "Description is Required",
                    })}
                    onKeyUp={() => {
                      trigger("description");
                    }}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Category</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className="form-group">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="stock_field">Stock:</label>
                  <input
                    type="number"
                    className={`form-control ${errors.stock && "is-invalid"}`}
                    {...register("stock", {
                      required: "Stock is Required",
                      pattern: {
                        value: /^\d*$/,
                        message: "Invalid Stock",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("stock");
                    }}
                  />
                  {errors.stock && (
                    <div className="invalid-feedback">
                      {errors.stock.message}
                    </div>
                  )}
                </div>

                {/* <div className="form-group">
                  <label htmlFor="seller_field">Seller Name</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div> */}

                <div className="form-group">
                  <label htmlFor="name_field">Seller Name:</label>
                  <input
                    type="name"
                    className={`form-control ${errors.seller && "is-invalid"}`}
                    {...register("seller", {
                      required: "Seller's name is Required",
                    })}
                    onKeyUp={() => {
                      trigger("seller");
                    }}
                  />
                  {errors.seller && (
                    <div className="invalid-feedback">
                      {errors.seller.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Images</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                      required
                    />

                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                {/* <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #87CEFA, #FFC0CB)",
                    border: "solid 3px",
                  }}
                  disabled={loading ? true : false}
                >
                  CREATE
                </button> */}

                <input
                  type="submit"
                  className="btn btn-block py-3"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #87CEFA, #FFC0CB)",
                    border: "solid 3px",
                  }}
                  disabled={loading ? true : false}
                  value="ADD PRODUCT"
                />
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}
export default NewProduct;
