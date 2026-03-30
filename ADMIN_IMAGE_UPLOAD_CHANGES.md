# Admin Page - Multiple Image Upload Implementation 🖼️

## Summary of Changes

The admin page has been updated to support **multiple image uploads** for shops instead of just a single cover image. Users can now add, view, and delete multiple images for each shop.

---

## Changes Made

### 1. **Frontend Updates**

#### `src/types/shop.ts`
- Added new `ShopImage` interface with properties:
  - `id`: Unique identifier for the image
  - `url`: Image URL
  - `alt`: Alternative text (optional)
  - `order`: Display order
- Updated `Shop` interface to include `images?: ShopImage[]` for multiple images

#### `src/components/admin/AdminComponents.tsx`
- **Enhanced `EditShopModal`**:
  - Added image gallery showing all existing images
  - Added image upload section with URL input and alt text
  - Added "Add Image" button to add new images via API
  - Added delete button for each image to remove images
  - Images are managed through API calls to `/api/admin/shops/{shopId}/images`
  - Real-time updates: Images are added/removed immediately from the UI

- **Updated `ShopDetailModal`**:
  - Now displays all images in a horizontal gallery
  - Shows image count
  - Main image is the first image in the list (if available)
  - Falls back to shop.image if no images exist
  - Images are clickable and show in a scrollable carousel

#### `src/components/pages/AdminPage.tsx`
- Updated `onEdit` handler to fetch full shop details (including images) when opening the edit modal
- Uses `/api/admin/shops/{id}` endpoint to get complete shop data with image relationships

### 2. **Backend (Already Implemented)**

The backend already has complete support for multiple images with these endpoints:

#### Admin Routes (in `src/routes/adminRoutes.ts`):
```
GET    /api/admin/shops/:shopId/images        - List all images for a shop
POST   /api/admin/shops/:shopId/images        - Add new image to shop
PUT    /api/admin/shops/:shopId/images/:id    - Update image (URL, alt, order)
DELETE /api/admin/shops/:shopId/images/:id    - Delete image
```

#### Admin Controller Functions:
- `getShopImages()` - Fetch all images for a shop
- `addShopImage()` - Create new shop image
- `updateShopImage()` - Update existing image
- `deleteShopImage()` - Delete image from shop

---

## How to Use

### Adding Images:
1. Click "แก้ไขข้อมูล" (Edit) on any shop
2. Scroll to "📸 จัดการรูปภาพ" section
3. In "เพิ่มรูปภาพใหม่" (Add New Image):
   - Paste image URL
   - (Optional) Add description (alt text)
   - Click "+ เพิ่มรูปภาพ" (Add Image)
4. Image is immediately added and displayed

### Removing Images:
1. In the "รูปภาพที่มีอยู่" (Existing Images) section
2. Click "ลบ" (Delete) on any image thumbnail
3. Confirm deletion

### Viewing All Images:
- In the Shop Detail view, all images are shown in a horizontal gallery
- The first image is displayed as the main image
- Scroll through thumbnails to see all images

---

## Database Structure

The backend uses a `ShopImage` model with the following fields:
```prisma
model ShopImage {
  id        String   @id @default(uuid())
  url       String   @db.Text
  alt       String?  @db.Text
  order     Int      @default(0)
  
  shopId    String
  shop      Shop     @relation(fields: [shopId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## API Integration

All image operations go through these endpoints:

**Add Image:**
```javascript
POST /api/admin/shops/{shopId}/images
Body: { url: string, alt?: string }
Response: { id, url, alt, order, shopId, createdAt, updatedAt }
```

**Delete Image:**
```javascript
DELETE /api/admin/shops/{shopId}/images/{imageId}
Response: { message: "Image deleted successfully" }
```

**Fetch Shop with Images:**
```javascript
GET /api/admin/shops/{id}
Response: includes images array with all shop images
```

---

## Features
✅ Multiple image uploads per shop
✅ Real-time image addition/deletion
✅ Image alt text support
✅ Image ordering capability
✅ Image preview in admin view
✅ Cascading delete (images deleted when shop is deleted)
✅ Responsive design for mobile and desktop

---

## Notes
- Images are stored with URLs (no file upload to server)
- Order is automatically assigned (next available order)
- All operations require admin authentication
- Images are displayed in the order they were added
