import  { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiSolidFile } from 'react-icons/bi'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "flowbite-react";


const schema = yup.object().shape({
  applicantCitizenship: yup.string().required("This field is required"),
  idDocNumber: yup
  .string()
  .matches(/^\d{16}$/, "ID number must be exactly 16 digits")
  .when("applicantCitizenship", {
    is: (val:string) => val === "Rwandan", 
    then: (schema) => schema.required("This Field is required"),
    otherwise: (schema) => schema.notRequired(),
  }),

  passportNumber: yup
  .string()
  .when("applicantCitizenship", {
    is: (val:string) => val === "Foreigner", 
    then: (schema) => schema.required("This Field is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  otherNames: yup.string().required("This Field is required"),
  surname: yup.string().required("This Field is required"),
  phoneNumber: yup.string(),
  countryCode:yup.string(),
  email: yup.string().email("Invalid email format"),
  location: yup.string().required("This Field is required"),
  businessType: yup.string().required("This Field is required"),
  companyName: yup.string().required("Company Name is required"),
  tinNumber: yup.string().matches(/^\d{9}$/, "Please provide a valid TIN number").required("This field is required"),
  regDate: yup.date().required("Registration Date is required"),
  businessLocation: yup.string().required("This Field is required"),
  purposeOfImportation: yup.string().required("This Field is required"),
  specifyPurpose: yup
  .string()
  .when("purposeOfImportation", {
    is: (val:string) => val === "Other", 
    then: (schema) => schema.required("Specify purpose of importation"),
    otherwise: (schema) => schema.notRequired(),
  }),

  productCategory: yup.string().required("This Field is required"),
  productName: yup.string().required("This Field is required"),
  description: yup.string().required("This Field is required"),
  unit: yup.string().required("This Field is required"),
  quantity: yup.number().required("This Field is required"),
});



const RicaImportPermitForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors},
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const citizenship = watch("applicantCitizenship");
  const purpose = watch("purposeOfImportation");

  const [submitting, setSubmitting] = useState(false);


  const onSubmit = async (data:any, event?: any) => {
    if (event) event.preventDefault(); 
    console.log("Submitting the form with data:", data); 
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email, 
          phoneNumber:data.countryCode+data.phoneNumber,
          otherNames: data.otherNames,
          surname: data.surname,
          applicantCitizenship: data.applicantCitizenship,
          passportNumber:data.passportNumber,
          idNumber:data.idDocNumber,
          ownerAddress:data.location,
          businessType:data.businessType,
          companyName: data.companyName,
          companyAddress:data.businessLocation,
          tinNumber: data.tinNumber,
          regDate:data.regDate,
          productName: data.productName,
          description: data.description,
          quantity: data.quantity,
          unit: data.unit,
        }),
      });
  
      if (response.ok) {
        toast.success("Form Submitted Successfully and Email Sent!");
      } else {
        toast.error("Submission successful, but email sending failed.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email. Please try again.");
    }
    finally{
      setSubmitting(false);
    }
  };

  


  const countryCodes = [
    { code: '+1', country: 'US/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+250', country: 'Rwanda' },
    { code: '+254', country: 'Kenya' },
    { code: '+255', country: 'Tanzania' },
    { code: '+256', country: 'Uganda' },
    { code: '+257', country: 'Burundi' },
    { code: '+243', country: 'DR Congo' },
    { code: '+27', country: 'South Africa' },
    { code: '+234', country: 'Nigeria' },
    { code: '+20', country: 'Egypt' },
    { code: '+212', country: 'Morocco' },
    { code: '+251', country: 'Ethiopia' },
    { code: '+233', country: 'Ghana' },
    { code: '+225', country: 'Ivory Coast' },
    { code: '+237', country: 'Cameroon' },
    { code: '+244', country: 'Angola' },
    { code: '+260', country: 'Zambia' },
    { code: '+263', country: 'Zimbabwe' },
    { code: '+216', country: 'Tunisia' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+31', country: 'Netherlands' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+91', country: 'India' },
    { code: '+92', country: 'Pakistan' },
    { code: '+971', country: 'UAE' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+61', country: 'Australia' },
    { code: '+64', country: 'New Zealand' },
    { code: '+7', country: 'Russia' },
    { code: '+380', country: 'Ukraine' },
    { code: '+48', country: 'Poland' },
    { code: '+46', country: 'Sweden' },
  ];


  return (
    <div className="container">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Business Owner Details */}
        <section className="form-section">
          <h3 className="section-header">
          <div className="header-icon">
              <BiSolidFile className="doc-icon" />
            </div>
            Business Owner Details</h3>
          
          <div className="form-content">
            <h4>Business Owner Address</h4>
            <div className="form-group">
              <label>
                Applicant Citizenship <span className="required">*</span>
              </label>
              <select 
                {...register("applicantCitizenship")}
              >
                <option value="">Select citizenship</option>
                <option value="Rwandan">Rwandan</option>
                <option value="Foreigner">Foreigner</option>
              </select>
              {errors.applicantCitizenship && (
                <p className="error">{errors.applicantCitizenship.message}</p>
              )}
            </div>

             {/* Conditional rendering for ID or Passport number */}
            {citizenship === "Rwandan" && (
              <div className="form-group">
                <label>
                  Identification Document Number <span className="required">*</span>
                </label>
                <input
                  {...register("idDocNumber")}
                  type="text"
                  placeholder="Enter Identification Document number"
                />
                {errors.idDocNumber && <p className="error">{errors.idDocNumber.message}</p>}
              </div>
            )}

            {citizenship === "Foreigner" && (
              <div className="form-group">
                <label>
                  Passport Number <span className="required">*</span>
                </label>
                <input
                  {...register("passportNumber")}
                  type="text"
                  placeholder="Enter passport number"
                />
                {errors.passportNumber && <p className="error">{errors.passportNumber.message}</p>}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label>
                  Phone Number
                </label>
                <div className="phone-input-container">
    <select 
      {...register("countryCode")}
      className="country-code-select"
      defaultValue="+250" 
    >
      {countryCodes.map((country) => (
        <option key={country.code} value={country.code}>
          {country.code}
        </option>
      ))}
    </select>
    <input
      {...register("phoneNumber")}
      type="text"
      className="phone-number-input"
      placeholder="781234567"
    />
  </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter an email address"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Other Names <span className="required">*</span></label>
                <input
                  {...register("otherNames")}
                  type="text"
                  placeholder="Enter Other Names"
                />
              </div>

              <div className="form-group">
                <label>Surname <span className="required">*</span></label>
                <input
                  {...register("surname")}
                  type="text"
                  placeholder="Enter your Surname"
                />
              </div>
            </div>

            <div className="sub-section">
              <h4>Business Owner Address</h4>
              <div className="form-group">
                <label>
                  Province <span className="required">*</span>
                </label>
                <select {...register("location")}>
                  <option value="">Select province</option>
                  <option value="Kigali">Kigali</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Western">Western</option>
                  <option value="Northern">Northern</option>
                  <option value="Southern">Southern</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Business Details */}
        <section className="form-section">
          <h3 className="section-header">
          <div className="header-icon">
              <BiSolidFile className="doc-icon" />
            </div>
            Business Details
          </h3>
          <div className="form-content">
            <h4>Business Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>
                  Business Type <span className="required">*</span>
                </label>
                <select {...register("businessType")}>
                  <option value="">Select business type</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Manufacturer">Manufacturer</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  Company Name <span className="required">*</span>
                </label>
                <input
                  {...register("companyName")}
                  type="text"
                  placeholder="Enter company name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  TIN Number <span className="required">*</span>
                </label>
                <input
                  {...register("tinNumber")}
                  type="text"
                  placeholder="Enter TIN Number"
                />
              </div>

              <div className="form-group">
                <label>
                  Registration Date <span className="required">*</span>
                </label>
                <input {...register("regDate")} type="date" max={new Date().toISOString().split("T")[0]} />
              </div>
            </div>

            <div className="sub-section">
              <h4>Business Address</h4>
              <div className="form-group">
                <label>
                  Province <span className="required">*</span>
                </label>
                <select {...register("businessLocation")}>
                  <option value="">Select province</option>
                  <option value="Kigali">Kigali</option>
                  <option value="Eastern">Eastern</option>
                  <option value="Western">Western</option>
                  <option value="Northern">Northern</option>
                  <option value="Southern">Southern</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Product Information */}
        <section className="form-section">
          <h3 className="section-header">
          <div className="header-icon">
              <BiSolidFile className="doc-icon" />
            </div>
            Product Information</h3>
          
          <div className="form-content">
            <div className="sub-section">
              <h4>Importation Details</h4>
              <div className="form-group">
                <label>
                  Purpose of Importation <span className="required">*</span>
                </label>
                <select
                  {...register("purposeOfImportation")}
                 
                >
                  <option value="">Enter the purpose of importation</option>
                  <option value="Direct Sale">Direct Sale</option>
                  <option value="Personal Use">Personal Use</option>
                  <option value="Trial Use">Trial Use</option>
                  <option value="Other">Other</option>
                </select>
              </div>
                {/* Specify Purpose of Importation */}
            {purpose === "Other" && (
              <div className="form-group">
                <label>
                  Specify Purpose of Importation <span className="required">*</span>
                </label>
                <input
                  {...register("specifyPurpose")}
                  type="text"
                  placeholder="Specify the purpose of importation"
                />
                {errors.specifyPurpose && (
                  <p className="error">{errors.specifyPurpose.message}</p>
                )}
              </div>
            )}
            </div>

            <div className="sub-section">
              <h4>Product Details</h4>
              <div className="form-group">
                <label>
                  Product Category <span className="required">*</span>
                </label>
                <select {...register("productCategory")}>
                  <option value="">Select product category</option>
                  <option value="General Purpose">General Purpose</option>
                  <option value="Construction Materials">Construction Materials</option>
                  <option value="Chemicals">Chemicals</option>
                </select>
              </div>

              <div className="form-group">
                <label>Product Name</label>
                <input
                  {...register("productName")}
                  type="text"
                  placeholder="Enter Product Name"
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  placeholder="Weight (kg)"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Unit of Measurement <span className="required">*</span>
                  </label>
                  <select {...register("unit")}>
                    <option value="">Select unit of measurement</option>
                    <option value="Kgs">Kgs</option>
                    <option value="Tons">Tons</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Quantity of Product(s) <span className="required">*</span>
                  </label>
                  <input
                    {...register("quantity")}
                    type="number"
                    placeholder="Enter quantity of product"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Description of Products <span className="required">*</span>
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Enter product description"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit"><span>{submitting ? "Submitting" :" Submit Form"}</span> {submitting && <span className="spinner"><Spinner/> </span>}</button>
        </div>
      </form>
    </div>
  );
};


export default RicaImportPermitForm;

