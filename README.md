# ✈️ Travel Itinerary Builder

A modern, feature-rich web application for creating professional travel itineraries with PDF export functionality. Built with React, TypeScript, and Vite.

![Itinerary Builder](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript)

## 📖 Overview

Travel Itinerary Builder is a comprehensive tool designed for travel agencies, tour operators, and travel enthusiasts to create detailed, professional-looking travel itineraries. The application features an intuitive multi-tab interface and generates high-quality PDF documents with custom layouts.

### ✨ Key Features

- **📝 Multi-Section Itinerary Planning**
  - Trip Overview with customer details
  - Day-by-day activity planning
  - Hotel booking management
  - Flight details tracking
  - Activity scheduling
  - Inclusion/Exclusion lists
  - Payment plan configuration

- **🎨 Professional PDF Generation**
  - Custom-designed templates
  - Dynamic content population
  - Smart page breaking
  - Automatic width adjustment for wide tables
  - High-quality JPEG export
  - Multi-page support

- **💼 Business Features**
  - Customer information management
  - Multiple payment installments
  - Detailed activity tables
  - Flight summaries
  - Hotel booking tracking
  - Inclusion/Exclusion summaries

- **🎯 User-Friendly Interface**
  - Clean, modern design
  - Responsive layout
  - Tab-based navigation
  - Add/remove dynamic sections
  - Form validation
  - Real-time preview

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety
- **Vite 5.4.10** - Build tool
- **Tailwind CSS 3.4.14** - Styling
- **Shadcn/ui** - Component library

### PDF Generation
- **jsPDF 2.5.2** - PDF creation
- **html2canvas 1.4.1** - HTML to canvas conversion

### Additional Libraries
- **Lucide React** - Icons
- **React Hook Form** - Form management
- **Sonner** - Toast notifications
- **Zod** - Schema validation

## 📦 Installation

### Prerequisites
- Node.js 16+ or Bun runtime
- npm, yarn, or bun package manager

### Clone the Repository
```bash
git clone https://github.com/yourusername/travel-itinerary-builder.git
cd travel-itinerary-builder
```

### Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

Using bun:
```bash
bun install
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will start on `http://localhost:5173`

### Production Build
```bash
npm run build
# or
yarn build
# or
bun run build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
# or
bun preview
```

## 📚 Usage Guide

### 1. Overview Tab
Enter basic trip information:
- Customer name
- Trip title and duration
- Departure/arrival details
- Destination
- Number of travelers

### 2. Days Tab
Create day-by-day itineraries:
- Add multiple days
- Set date and title for each day
- Define morning, afternoon, and evening activities
- Add custom images for each day

### 3. Hotel Tab
Manage accommodation:
- Add multiple hotels
- Set check-in/check-out dates
- Specify city and number of nights
- Track hotel names

### 4. Flights Tab
Record flight information:
- Add multiple flights
- Enter airline and flight number
- Specify departure/arrival cities
- Include airport codes

### 5. Activities Tab
List all planned activities:
- Activity name and city
- Activity type (sightseeing, adventure, etc.)
- Time required
- Add unlimited activities

### 6. Inclusions List Tab
Define what's included in the package:
- Category (flights, hotels, transport, etc.)
- Count and details
- Status/comments

### 7. Payment Tab
Set up payment structure:
- Total amount and TCS
- Multiple installment options
- Due dates and descriptions

### 8. Details Tab
Add comprehensive information:
- Inclusions text
- Exclusions text
- Terms and conditions

## 🎨 Project Structure

```
src/
├── components/
│   ├── ItineraryBuilder.tsx      # Main component
│   ├── itinerary/                # Itinerary sub-components
│   │   ├── ActivityTable.tsx
│   │   ├── DayPlanner.tsx
│   │   ├── FlightDetails.tsx
│   │   ├── HotelDetails.tsx
│   │   ├── InclusionsExclusions.tsx
│   │   ├── InclusionSummary.tsx
│   │   ├── PaymentPlan.tsx
│   │   └── TripOverview.tsx
│   └── ui/                       # Reusable UI components
├── types/
│   └── itinerary.ts              # TypeScript type definitions
├── utils/
│   ├── pdfGenerator.ts           # PDF generation logic
│   ├── template.html             # PDF template
│   └── styles.css                # PDF styles
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
└── pages/                        # Page components
```

## 🔧 Configuration

### Tailwind Configuration
The project uses custom Tailwind configuration with:
- Custom colors (primary, accent, deep-purple, etc.)
- Custom border radius values
- Extended spacing
- Custom fonts (Poppins, Roboto, Red Hat Display)

### PDF Template Customization
Edit `src/utils/template.html` and `src/utils/styles.css` to customize the PDF output design.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Limitations

- PDF generation works best in Chrome/Chromium-based browsers
- Large itineraries may take a few seconds to generate PDFs
- Images in PDFs require CORS-enabled URLs

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon set
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) for HTML to canvas conversion

---

