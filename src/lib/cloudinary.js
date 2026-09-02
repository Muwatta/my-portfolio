/**
 * Cloudinary Integration - Secure Widget for Admin Uploads
 * No API keys exposed in frontend
 */

const CLOUD_NAME = "dee5edoss";

/**
 * Load Cloudinary widget script
 */
export function loadCloudinaryWidget() {
  return new Promise((resolve, reject) => {
    if (window.cloudinary) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/index.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = () =>
      reject(new Error("Failed to load Cloudinary widget"));
    document.body.appendChild(script);
  });
}

/**
 * Open Cloudinary upload widget
 * @param {Object} options - Configuration options
 * @param {string} options.folder - Upload folder (e.g., 'portfolio/blog')
 * @param {string[]} options.resourceType - What to allow ['image', 'raw', etc]
 * @param {number} options.maxFileSize - Max size in bytes (default: 5MB)
 * @param {Function} options.onSuccess - Callback with upload result
 * @param {Function} options.onError - Error callback
 * @returns {void}
 */
export async function openUploadWidget({
  folder = "portfolio",
  resourceType = ["image"],
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  onSuccess,
  onError,
}) {
  try {
    await loadCloudinaryWidget();

    if (!window.cloudinary) {
      throw new Error("Cloudinary widget not loaded");
    }

    // Secure widget configuration
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: "unsigned_portfolio", // Must be created in Cloudinary dashboard as Unsigned
        folder: folder,
        resourceType: resourceType,
        maxFileSize: maxFileSize,
        clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
        maxFiles: 1,
        showAdvancedOptions: false,
        cropping: true,
        croppingAspectRatio: 16 / 9, // Default for blog covers
        showCompletedButton: true,
        multiple: false,
        autoMinimize: true,
        startWithCollapsedFolders: true,
      },
      (error, result) => {
        if (error) {
          onError?.(error);
          return;
        }

        if (result.event === "success") {
          // Safe: only expose public URL and metadata
          const safeResult = {
            url: result.info.secure_url,
            publicId: result.info.public_id,
            size: result.info.bytes,
            format: result.info.format,
            width: result.info.width,
            height: result.info.height,
            uploadedAt: new Date().toISOString(),
          };
          onSuccess?.(safeResult);
        }
      },
    );

    widget.open();
  } catch (err) {
    onError?.(err);
  }
}

/**
 * Validate image before upload
 * @param {File} file
 * @returns {Object} { valid, error }
 */
export function validateImageFile(file) {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (!file) {
    return { valid: false, error: "No file selected" };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: `File too large. Max ${MAX_SIZE / 1024 / 1024}MB`,
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Use JPG, PNG, GIF, or WebP",
    };
  }

  return { valid: true };
}

/**
 * Generate optimized Cloudinary URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {string} Optimized URL
 */
export function getOptimizedImageUrl(publicId, options = {}) {
  const {
    width = 1200,
    height = 630,
    quality = "auto",
    format = "auto",
  } = options;

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill,q_${quality},f_${format}/${publicId}`;
}
