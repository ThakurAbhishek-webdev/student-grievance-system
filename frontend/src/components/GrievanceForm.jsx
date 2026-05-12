import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const PACKAGE_TYPES = ["Silver", "Gold", "Platinum"];
const STATUSES = ["Pending", "Confirmed", "Cancelled"];

const GrievanceForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  loading,
}) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    destinationName: "",
    travelDate: "",
    numberOfTravelers: 1,
    packageType: "Silver",
    price: "",
    bookingStatus: "Pending",
    contactAddress: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        destinationName:
          initialData.destinationName || "",

        travelDate: initialData.travelDate
          ? new Date(initialData.travelDate)
              .toISOString()
              .split("T")[0]
          : "",

        numberOfTravelers:
          initialData.numberOfTravelers || 1,

        packageType:
          initialData.packageType || "Silver",

        price: initialData.price || "",

        bookingStatus:
          initialData.bookingStatus || "Pending",

        contactAddress:
          initialData.contactAddress || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.destinationName.trim()) {
      newErrors.destinationName =
        "Destination required";
    }

    if (!formData.travelDate) {
      newErrors.travelDate =
        "Travel date required";
    }

    if (
      !formData.numberOfTravelers ||
      formData.numberOfTravelers <= 0
    ) {
      newErrors.numberOfTravelers =
        "Enter valid travelers";
    }

    if (!formData.packageType) {
      newErrors.packageType =
        "Package type required";
    }

    if (
      !formData.price ||
      Number(formData.price) <= 0
    ) {
      newErrors.price =
        "Price required";
    }

    if (!formData.contactAddress.trim()) {
      newErrors.contactAddress =
        "Address required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      {/* Destination */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Destination Name
        </label>

        <input
          type="text"
          name="destinationName"
          value={formData.destinationName}
          onChange={handleChange}
          placeholder="Goa"
          className="input-field"
        />

        {errors.destinationName && (
          <p className="text-red-400 text-sm mt-1">
            {errors.destinationName}
          </p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Travel Date
        </label>

        <input
          type="date"
          name="travelDate"
          value={formData.travelDate}
          onChange={handleChange}
          className="input-field"
        />

        {errors.travelDate && (
          <p className="text-red-400 text-sm mt-1">
            {errors.travelDate}
          </p>
        )}
      </div>

      {/* Travelers */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Number of Travelers
        </label>

        <input
          type="number"
          name="numberOfTravelers"
          value={formData.numberOfTravelers}
          onChange={handleChange}
          className="input-field"
        />

        {errors.numberOfTravelers && (
          <p className="text-red-400 text-sm mt-1">
            {errors.numberOfTravelers}
          </p>
        )}
      </div>

      {/* Package */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Package Type
        </label>

        <select
          name="packageType"
          value={formData.packageType}
          onChange={handleChange}
          className="input-field"
        >
          {PACKAGE_TYPES.map((pkg) => (
            <option key={pkg} value={pkg}>
              {pkg}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Package Price
        </label>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="5000"
          className="input-field"
        />

        {errors.price && (
          <p className="text-red-400 text-sm mt-1">
            {errors.price}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Booking Status
        </label>

        <select
          name="bookingStatus"
          value={formData.bookingStatus}
          onChange={handleChange}
          className="input-field"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm text-slate-300 mb-1">
          Contact Address
        </label>

        <textarea
          rows={4}
          name="contactAddress"
          value={formData.contactAddress}
          onChange={handleChange}
          placeholder="Enter address..."
          className="input-field"
        />

        {errors.contactAddress && (
          <p className="text-red-400 text-sm mt-1">
            {errors.contactAddress}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">

        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          {loading ? (
            <>
              <Spinner
                size="h-4 w-4"
                color="border-white"
              />
              Saving...
            </>
          ) : isEditing ? (
            "Update Booking"
          ) : (
            "Book Package"
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default GrievanceForm;