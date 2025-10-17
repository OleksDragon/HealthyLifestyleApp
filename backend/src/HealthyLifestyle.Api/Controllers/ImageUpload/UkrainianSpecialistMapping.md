# Ukrainian Specialist Image Mapping

## Overview
This document describes the mapping between Ukrainian specialist names (input) and their corresponding English names (storage) with card images.

## Specialist Mapping

| Ukrainian Input | English Storage | Card Image | MinIO Path | Database Lookup |
|-----------------|-----------------|------------|------------|-----------------|
| Маргарита Дронова | Margarita Dronova | card-1.png | specialists/margarita_dronova_card.png | Margarita Dronova |
| Олексій Соколенко | Oleksiy Sokolenko | card-4.png | specialists/oleksiy_sokolenko_card.png | Oleksiy Sokolenko |
| Антоніна Смила | Antonina Smila | card-5.png | specialists/antonina_smila_card.png | Antonina Smila |
| Олександр Медичний | Oleksandr Medychnyi | card-3.png | specialists/oleksandr_medychnyi_card.png | Oleksandr Medychnyi |
| Андрій Кач | Andriy Kach | card-6.png | specialists/andriy_kach_card.png | Andriy Kach |
| Олеся Мамкіна | Olesya Mamkina | card-2.png | specialists/olesya_mamkina_card.png | Olesya Mamkina |
| Дмитро Делитанович | Dmytro Delytanovych | card-6.png | specialists/dmytro_delytanovych_card.png | Dmytro Delytanovych |

## Key Features

### 🔄 **Ukrainian Input → English Storage**
- **Input**: Ukrainian names (e.g., "Маргарита Дронова")
- **MinIO Storage**: English paths (e.g., "specialists/margarita_dronova_card.png")
- **Database Lookup**: English names (e.g., "Margarita Dronova")
- **Response**: Shows both Ukrainian input and English storage

## API Endpoints

### 1. Upload by Specialist ID (Recommended)
```
POST /api/SpecialistImage/upload-by-id
```

**Parameters:**
- `file`: Image file (multipart/form-data)
- `specialistId`: Specialist ID (Guid)
- `imageType`: Image type (default: "card")

**Example Request:**
```bash
curl -X POST "https://api.example.com/api/SpecialistImage/upload-by-id" \
  -F "file=@specialist-image.jpg" \
  -F "specialistId=12345678-1234-1234-1234-123456789012" \
  -F "imageType=card"
```

**Response:**
```json
{
  "imageUrl": "http://minio:9000/specialists/123456781234123412341234123456789012_card.jpg",
  "specialistName": "12345678-1234-1234-1234-123456789012",
  "imageType": "card",
  "message": "Зображення успішно завантажено та збережено в базу даних для спеціаліста з ID: 12345678-1234-1234-1234-123456789012",
  "savedToDatabase": true,
  "databaseEntityType": "TrainerDetails"
}
```

### 2. Upload by Ukrainian Name (Legacy - No Database Save)
```
POST /api/SpecialistImage/upload-by-ukrainian-name
```

**Parameters:**
- `file`: Image file (multipart/form-data)
- `specialistName`: Ukrainian specialist name (e.g., "Маргарита Дронова")
- `imageType`: Image type (default: "card")

**Note:** This endpoint uploads the image but does NOT save the URL to the database. Use the ID-based endpoint for full functionality.

### 3. General Upload (Legacy - No Database Save)
```
POST /api/SpecialistImage/upload-and-save
```

**Parameters:**
- `file`: Image file (multipart/form-data)
- `specialistName`: Specialist name (Ukrainian or English)
- `imageType`: Image type (default: "card")

**Note:** This endpoint uploads the image but does NOT save the URL to the database. Use the ID-based endpoint for full functionality.

## Database Integration

The system automatically saves image URLs to the `CardPictureUrl` field in the appropriate specialist detail entity by directly querying the specialist detail tables:

### **Direct Entity Lookup:**
```csharp
// Find specialist details by ID
var trainer = await _context.TrainerDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
var psychologist = await _context.PsychologistDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
var doctor = await _context.DoctorDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
var dietitian = await _context.DietitianDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
```

### **Supported Specialist Types:**
- **TrainerDetails**: For fitness trainers
- **DoctorDetails**: For medical doctors
- **DietitianDetails**: For nutrition specialists
- **PsychologistDetails**: For mental health specialists

### **Performance Benefits:**
- ✅ **Direct Queries**: No need to go through User → UserProfessionalQualification → Details
- ✅ **Faster Lookups**: Direct table queries are more efficient
- ✅ **Simplified Logic**: Cleaner code without complex navigation properties
- ✅ **Better Performance**: Reduced database round trips

## File Naming Convention

### ID-Based Storage (Recommended)
Images are stored with the following naming pattern:
```
specialists/{specialist_id}_{image_type}.{extension}
```

**Examples:**
- Specialist ID: `12345678-1234-1234-1234-123456789012` → Storage: `specialists/123456781234123412341234123456789012_card.png`
- Specialist ID: `87654321-4321-4321-4321-210987654321` → Storage: `specialists/876543214321432143214321210987654321_card.png`

### Name-Based Storage (Legacy)
Images are stored with the following naming pattern:
```
specialists/{english_name}_{image_type}.{extension}
```

**Examples:**
- Input: "Маргарита Дронова" → Storage: `specialists/margarita_dronova_card.png`
- Input: "Олексій Соколенко" → Storage: `specialists/oleksiy_sokolenko_card.png`
- Input: "Антоніна Смила" → Storage: `specialists/antonina_smila_card.png`

**Conversion Process (Legacy):**
1. **Ukrainian Input**: "Маргарита Дронова"
2. **Convert to English**: "Margarita Dronova" 
3. **Clean for filename**: "margarita_dronova"
4. **Final path**: `specialists/margarita_dronova_card.png`

## Validation

The system validates Ukrainian specialist names against the predefined list:
- Маргарита Дронова
- Олексій Соколенко
- Антоніна Смила
- Олександр Медичний
- Андрій Кач
- Олеся Мамкіна
- Дмитро Делитанович

## Error Handling

If an invalid specialist name is provided, the API returns:
```json
{
  "message": "Невірне ім'я спеціаліста. Дозволені: Маргарита Дронова, Олексій Соколенко, ..."
}
```
