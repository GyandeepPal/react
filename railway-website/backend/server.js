const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ==================================================
// PDF FILE SERVING
// ==================================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ==================================================
// ADMIN MODEL
// ==================================================

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminUser = mongoose.model(
  "AdminUser",
  adminSchema
);


// ==================================================
// NOTICE MODEL
// ==================================================

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    category: {
      type: String,
      default: "Notice",
    },

    description: {
      type: String,
      default: "",
    },

    isNew: {
      type: Boolean,
      default: true,
    },

    pdfUrl: {
      type: String,
      default: "",
    },

    pdfName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model(
  "Notice",
  noticeSchema
);


// ==================================================
// RECRUITMENT MODEL
// ==================================================

const recruitmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    category: {
      type: String,
      default: "Recruitment",
    },

    description: {
      type: String,
      default: "",
    },

    isNew: {
      type: Boolean,
      default: true,
    },

    pdfUrl: {
      type: String,
      default: "",
    },

    pdfName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Recruitment = mongoose.model(
  "Recruitment",
  recruitmentSchema
);


// ==================================================
// TENDER MODEL
// ==================================================

const tenderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    category: {
      type: String,
      default: "Tender",
    },

    description: {
      type: String,
      default: "",
    },

    isNew: {
      type: Boolean,
      default: true,
    },

    pdfUrl: {
      type: String,
      default: "",
    },

    pdfName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Tender = mongoose.model(
  "Tender",
  tenderSchema
);


// ==================================================
// JWT AUTH MIDDLEWARE
// ==================================================

const verifyAdmin = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. Login required.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired token",
    });

  }
};


// ==================================================
// MULTER PDF UPLOAD
// ==================================================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(
      null,
      path.join(__dirname, "uploads")
    );

  },

  filename: (req, file, cb) => {

    const uniqueName =
      `${Date.now()}-${file.originalname.replace(
        /[^a-zA-Z0-9.-]/g,
        "_"
      )}`;

    cb(null, uniqueName);

  },

});

const upload = multer({

  storage: storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {

    if (file.mimetype === "application/pdf") {

      cb(null, true);

    } else {

      cb(
        new Error("Only PDF files are allowed")
      );

    }

  },

});


// ==================================================
// HOME
// ==================================================

app.get("/", (req, res) => {

  res.json({
    message: "Railway Backend is running 🚆",
  });

});


// ==================================================
// ADMIN LOGIN
// ==================================================

app.post(
  "/api/auth/login",
  async (req, res) => {

    try {

      const {
        username,
        password,
      } = req.body;

      if (!username || !password) {

        return res.status(400).json({
          message:
            "Username and password are required",
        });

      }

      const admin =
        await AdminUser.findOne({
          username,
        });

      if (!admin) {

        return res.status(401).json({
          message:
            "Invalid username or password",
        });

      }

      const passwordMatch =
        await bcrypt.compare(
          password,
          admin.password
        );

      if (!passwordMatch) {

        return res.status(401).json({
          message:
            "Invalid username or password",
        });

      }

      const token = jwt.sign(

        {
          id: admin._id,
          username: admin.username,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1d",
        }

      );

      res.json({

        message: "Login successful",

        token,

        user: {
          username: admin.username,
        },

      });

    } catch (error) {

      res.status(500).json({

        message: "Login failed",

        error: error.message,

      });

    }

  }
);


// ==================================================
// CREATE FIRST ADMIN
// ==================================================

app.post(
  "/api/auth/create-admin",
  async (req, res) => {

    try {

      const {
        username,
        password,
      } = req.body;

      if (!username || !password) {

        return res.status(400).json({
          message:
            "Username and password are required",
        });

      }

      const existingAdmin =
        await AdminUser.findOne({
          username,
        });

      if (existingAdmin) {

        return res.status(400).json({
          message: "Admin already exists",
        });

      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const admin =
        await AdminUser.create({

          username,

          password: hashedPassword,

        });

      res.status(201).json({

        message:
          "Admin created successfully",

        username:
          admin.username,

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to create admin",

        error:
          error.message,

      });

    }

  }
);


// ==================================================
// PDF UPLOAD API
// ==================================================

app.post(
  "/api/uploads/pdf",
  verifyAdmin,
  (req, res) => {

    upload.single("pdf")(
      req,
      res,
      (err) => {

        if (err) {

          return res.status(400).json({
            message: err.message,
          });

        }

        if (!req.file) {

          return res.status(400).json({
            message:
              "PDF file is required",
          });

        }

        res.status(201).json({

          message:
            "PDF uploaded successfully",

          filename:
            req.file.filename,

          url:
            `/uploads/${req.file.filename}`,

        });

      }
    );

  }
);


// ==================================================
// NOTICE APIs
// ==================================================

// PUBLIC GET

app.get(
  "/api/notices",
  async (req, res) => {

    try {

      const notices =
        await Notice
          .find()
          .sort({
            createdAt: -1,
          });

      res.json(notices);

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to fetch notices",

        error:
          error.message,

      });

    }

  }
);


// ADMIN CREATE

app.post(
  "/api/notices",
  verifyAdmin,
  async (req, res) => {

    try {

      const notice =
        await Notice.create({

          title:
            req.body.title,

          category:
            req.body.category,

          description:
            req.body.description,

          isNew:
            req.body.isNew,

          pdfUrl:
            req.body.pdfUrl,

          pdfName:
            req.body.pdfName,

        });

      res.status(201).json(
        notice
      );

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to create notice",

        error:
          error.message,

      });

    }

  }
);


// ADMIN UPDATE

app.put(
  "/api/notices/:id",
  verifyAdmin,
  async (req, res) => {

    try {

      const notice =
        await Notice.findByIdAndUpdate(

          req.params.id,

          {

            title:
              req.body.title,

            category:
              req.body.category,

            description:
              req.body.description,

            isNew:
              req.body.isNew,

            pdfUrl:
              req.body.pdfUrl,

            pdfName:
              req.body.pdfName,

          },

          {

            new: true,

            runValidators: true,

          }

        );

      res.json(notice);

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to update notice",

        error:
          error.message,

      });

    }

  }
);


// ADMIN DELETE

app.delete(
  "/api/notices/:id",
  verifyAdmin,
  async (req, res) => {

    try {

      await Notice.findByIdAndDelete(
        req.params.id
      );

      res.json({

        message:
          "Notice deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to delete notice",

        error:
          error.message,

      });

    }

  }
);


// ==================================================
// RECRUITMENT APIs
// ==================================================

// PUBLIC GET

app.get(
  "/api/recruitments",
  async (req, res) => {

    try {

      const recruitments =
        await Recruitment
          .find()
          .sort({
            createdAt: -1,
          });

      res.json(recruitments);

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to fetch recruitments",

        error:
          error.message,

      });

    }

  }
);


// ADMIN CREATE

app.post(
  "/api/recruitments",
  verifyAdmin,
  async (req, res) => {

    try {

      const recruitment =
        await Recruitment.create({

          title:
            req.body.title,

          category:
            req.body.category,

          description:
            req.body.description,

          isNew:
            req.body.isNew,

          pdfUrl:
            req.body.pdfUrl,

          pdfName:
            req.body.pdfName,

        });

      res.status(201).json(
        recruitment
      );

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to create recruitment",

        error:
          error.message,

      });

    }

  }
);


// ADMIN UPDATE

app.put(
  "/api/recruitments/:id",
  verifyAdmin,
  async (req, res) => {

    try {

      const recruitment =
        await Recruitment.findByIdAndUpdate(

          req.params.id,

          {

            title:
              req.body.title,

            category:
              req.body.category,

            description:
              req.body.description,

            isNew:
              req.body.isNew,

            pdfUrl:
              req.body.pdfUrl,

            pdfName:
              req.body.pdfName,

          },

          {

            new: true,

            runValidators: true,

          }

        );

      res.json(recruitment);

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to update recruitment",

        error:
          error.message,

      });

    }

  }
);


// ADMIN DELETE

app.delete(
  "/api/recruitments/:id",
  verifyAdmin,
  async (req, res) => {

    try {

      await Recruitment.findByIdAndDelete(
        req.params.id
      );

      res.json({

        message:
          "Recruitment deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to delete recruitment",

        error:
          error.message,

      });

    }

  }
);


// ==================================================
// TENDER APIs
// ==================================================

// PUBLIC GET

app.get(
  "/api/tenders",
  async (req, res) => {

    try {

      const tenders =
        await Tender
          .find()
          .sort({
            createdAt: -1,
          });

      res.json(tenders);

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to fetch tenders",

        error:
          error.message,

      });

    }

  }
);


// ADMIN CREATE

app.post(
  "/api/tenders",
  verifyAdmin,
  async (req, res) => {

    try {

      const tender =
        await Tender.create({

          title:
            req.body.title,

          category:
            req.body.category,

          description:
            req.body.description,

          isNew:
            req.body.isNew,

          pdfUrl:
            req.body.pdfUrl,

          pdfName:
            req.body.pdfName,

        });

      res.status(201).json(
        tender
      );

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to create tender",

        error:
          error.message,

      });

    }

  }
);


// ADMIN UPDATE

app.put(
  "/api/tenders/:id",
  verifyAdmin,
  async (req, res) => {

    try {

      const tender =
        await Tender.findByIdAndUpdate(

          req.params.id,

          {

            title:
              req.body.title,

            category:
              req.body.category,

            description:
              req.body.description,

            isNew:
              req.body.isNew,

            pdfUrl:
              req.body.pdfUrl,

            pdfName:
              req.body.pdfName,

          },

          {

            new: true,

            runValidators: true,

          }

        );

      res.json(tender);

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to update tender",

        error:
          error.message,

      });

    }

  }
);


// ADMIN DELETE

app.delete(
  "/api/tenders/:id",
  verifyAdmin,
  async (req, res) => {

    try {

      await Tender.findByIdAndDelete(
        req.params.id
      );

      res.json({

        message:
          "Tender deleted successfully",

      });

    } catch (error) {

      res.status(500).json({

        message:
          "Failed to delete tender",

        error:
          error.message,

      });

    }

  }
);


// ==================================================
// MONGODB CONNECTION
// ==================================================

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "MongoDB Connected ✅"
    );

    app.listen(
      process.env.PORT,
      () => {

        console.log(
          `Server running on http://localhost:${process.env.PORT}`
        );

      }
    );

  })

  .catch((error) => {

    console.log(
      "MongoDB Connection Error ❌"
    );

    console.log(
      error.message
    );

  });