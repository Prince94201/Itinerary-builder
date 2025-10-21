import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ItineraryData } from "@/types/itinerary";
import templateHTML from "./template.html?raw";
import styles from "./styles.css?raw";

export const generatePDF = async (data: ItineraryData) => {
  try {
    console.log("🚀 PDF Generation started", data);
    
    // Create a container with the template
    const container = document.createElement("div");
    
    // Inject CSS styles into the template
    const styledHTML = `
      <style>
        ${styles}
      </style>
      ${templateHTML}
    `;
    
    container.innerHTML = styledHTML;
    console.log("✅ Template loaded with styles and container created");
    
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.width = "210mm";
    container.style.height = "auto";
    container.style.backgroundColor = "white";
    container.style.boxSizing = "border-box";
    container.style.margin = "0";
    container.style.padding = "0";

    // Update only the specified fields
    const customerNameEl = container.querySelector("#customer-name");
    if (customerNameEl) {
      customerNameEl.textContent = `Hi, ${data.customerName || 'Valued Customer'}!`;
      console.log("✅ Updated customer-name:", customerNameEl.textContent);
    } else {
      console.warn("⚠️ customer-name element not found");
    }

    const tripTitleEl = container.querySelector("#trip-title");
    if (tripTitleEl) {
      tripTitleEl.textContent = data.title || 'Travel Itinerary';
      console.log("✅ Updated trip-title:", tripTitleEl.textContent);
    } else {
      console.warn("⚠️ trip-title element not found");
    }

    const tripDurationEl = container.querySelector("#trip_duration");
    if (tripDurationEl) {
      tripDurationEl.textContent = data.duration || '';
      console.log("✅ Updated trip_duration:", tripDurationEl.textContent);
    } else {
      console.warn("⚠️ trip_duration element not found");
    }

    const departureFromEl = container.querySelector("#departure-from");
    if (departureFromEl) {
      departureFromEl.textContent = data.departureFrom || '';
      console.log("✅ Updated departure-from:", departureFromEl.textContent);
    } else {
      console.warn("⚠️ departure-from element not found");
    }

    const departureDateEl = container.querySelector("#departure-date");
    if (departureDateEl) {
      departureDateEl.textContent = data.departureDate || '';
      console.log("✅ Updated departure-date:", departureDateEl.textContent);
    } else {
      console.warn("⚠️ departure-date element not found");
    }

    const arrivalDateEl = container.querySelector("#arrival-date");
    if (arrivalDateEl) {
      arrivalDateEl.textContent = data.arrivalDate || '';
      console.log("✅ Updated arrival-date:", arrivalDateEl.textContent);
    } else {
      console.warn("⚠️ arrival-date element not found");
    }

    const destinationEl = container.querySelector("#destination");
    if (destinationEl) {
      destinationEl.textContent = data.destination || '';
      console.log("✅ Updated destination:", destinationEl.textContent);
    } else {
      console.warn("⚠️ destination element not found");
    }

    const travelersEl = container.querySelector("#no_of_travellers");
    if (travelersEl) {
      travelersEl.textContent = String(data.travellers) || '';
      console.log("✅ Updated no_of_travellers:", travelersEl.textContent);
    } else {
      console.warn("⚠️ no_of_travellers element not found");
    }

    // Map itinerary days
    const itineraryDaysContainer = container.querySelector("#itinerary-days");
    if (itineraryDaysContainer && data.days && data.days.length > 0) {
      // Keep the first day as template reference
      const firstDayTemplate = itineraryDaysContainer.querySelector(".grid");
      
      // Clear existing days except template
      itineraryDaysContainer.innerHTML = '';
      
      // Create a wrapper for all days
      const daysWrapper = document.createElement("div");
      daysWrapper.className = "space-y-8 md:space-y-12";
      
      // Map each day
      data.days.forEach((day, index) => {
        const dayDiv = document.createElement("div");
        dayDiv.innerHTML = `
          <div class="grid grid-cols-1 lg-grid-cols-auto-1fr gap-6 md:gap-8 lg:gap-12">
            <div class="flex flex-row mx-auto items-center lg:items-start gap-4 lg:gap-6">
              <div class="flex-shrink-0 w-16 h-48 md:h-64 lg:h-80 bg-deep-purple rounded-30 flex items-center justify-center">
                <div class="transform -rotate-90 whitespace-nowrap">
                  <span class="text-white font-roboto text-2xl md:text-[26px] font-bold">Day ${index + 1}</span>
                </div>
              </div>
              <div class="flex flex-col items-center text-center">
                <div class="w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden mb-4">
                  <img src="${day.image || 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80'}"
                    alt="${day.title}"
                    class="w-full h-full object-cover">
                </div>
                <h3 class="font-roboto text-xl md:text-2xl lg:text-[26px] font-bold mb-2">${day.date}</h3>
                <p class="font-roboto text-lg md:text-xl max-w-[299px]">${day.title}</p>
              </div>
            </div>
            <div class="relative pl-8 md:pl-12 lg:pl-16">
              <div class="absolute left-2 md:left-4 lg:left-6 top-4 bottom-4 w-1 bg-accent-blue"></div>
              <div class="absolute left-0 md:left-2 lg:left-4 top-6 w-4 h-4 rounded-full bg-white border-3 border-deep-purple"></div>
              <div class="absolute left-0 md:left-2 lg:left-4 top-24 md:top-32 w-4 h-4 rounded-full bg-white border-3 border-deep-purple"></div>
              <div class="absolute left-0 md:left-2 lg:left-4 bottom-6 w-4 h-4 rounded-full bg-white border-3 border-deep-purple"></div>
              <div class="space-y-6 md:space-y-8">
                ${day.morning ? `
                  <div>
                    <h4 class="font-roboto text-base md:text-xl font-bold mb-1 leading-8">Morning</h4>
                    <p class="font-roboto text-base md:text-xl leading-8">${day.morning}</p>
                  </div>
                ` : ''}
                ${day.afternoon ? `
                  <div>
                    <h4 class="font-roboto text-base md:text-xl font-bold mb-1 leading-8">Afternoon</h4>
                    <div class="font-roboto text-base md:text-xl leading-8">
                      <p>${day.afternoon}</p>
                    </div>
                  </div>
                ` : ''}
                ${day.evening ? `
                  <div>
                    <h4 class="font-roboto text-base md:text-xl font-bold mb-1 leading-8">Evening</h4>
                    <p class="font-roboto text-base md:text-xl leading-8">${day.evening}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
          <div class="border-t border-muted-gray mt-8 md:mt-12"></div>
        `;
        daysWrapper.appendChild(dayDiv);
      });
      
      itineraryDaysContainer.appendChild(daysWrapper);
      console.log("✅ Updated itinerary days:", data.days.length, "days mapped");
    } else {
      console.warn("⚠️ itinerary-days element or days data not found");
    }

    // Map hotel bookings
    const hotelBookingsContainer = container.querySelector("#hotel-bookings");
    if (hotelBookingsContainer && data.hotel && data.hotel.length > 0) {
      // Clear existing content
      hotelBookingsContainer.innerHTML = '';
      
      // Create wrapper for all hotels
      const hotelsWrapper = document.createElement("div");
      hotelsWrapper.className = "space-y-8 md:space-y-12";
      
      // Map each hotel
      data.hotel.forEach((hotel, index) => {
        const hotelDiv = document.createElement("div");
        hotelDiv.innerHTML = `
          <div class="inline-block min-w-full align-middle px-4 md:px-0">
            <div class="grid grid-cols-5 gap-2 md:gap-4">
              <div class="space-y-2 md:space-y-4">
                <div class="bg-deep-purple rounded-t-[45px] px-4 md:px-6 py-3 md:py-4 text-center">
                  <h3 class="text-lg md:text-[26px] font-medium leading-8 text-white">City</h3>
                </div>
                <div class="bg-brand-purple-light rounded-b-[30px] px-4 md:px-6 py-8 md:py-10 space-y-10 md:space-y-14">
                  <p class="text-lg md:text-xl font-light leading-8 text-center">${hotel.city || "N/A"}</p>
                </div>
              </div>
              <div class="space-y-2 md:space-y-4">
                <div class="bg-deep-purple rounded-t-[45px] px-4 md:px-6 py-3 md:py-4 text-center">
                  <h3 class="text-lg md:text-[26px] font-medium leading-8 text-white">Check In</h3>
                </div>
                <div class="bg-brand-purple-light rounded-b-[30px] px-4 md:px-6 py-8 md:py-10 space-y-10 md:space-y-14">
                  <p class="text-lg md:text-xl font-light leading-8 text-center">${hotel.checkIn || "N/A"}</p>
                </div>
              </div>
              <div class="space-y-2 md:space-y-4">
                <div class="bg-deep-purple rounded-t-[45px] px-4 md:px-6 py-3 md:py-4 text-center">
                  <h3 class="text-lg md:text-[26px] font-medium leading-8 text-white">Check Out</h3>
                </div>
                <div class="bg-brand-purple-light rounded-b-[30px] px-4 md:px-6 py-8 md:py-10 space-y-10 md:space-y-14">
                  <p class="text-lg md:text-xl font-light leading-8 text-center">${hotel.checkOut || "N/A"}</p>
                </div>
              </div>
              <div class="space-y-2 md:space-y-4">
                <div class="bg-deep-purple rounded-t-[45px] px-4 md:px-6 py-3 md:py-4 text-center">
                  <h3 class="text-lg md:text-[26px] font-medium leading-8 text-white">Nights</h3>
                </div>
                <div class="bg-brand-purple-light rounded-b-[30px] px-4 md:px-6 py-8 md:py-10 space-y-10 md:space-y-14">
                  <p class="text-lg md:text-xl font-light leading-8 text-center">${hotel.nights || "N/A"}</p>
                </div>
              </div>
              <div class="space-y-2 md:space-y-4">
                <div class="bg-deep-purple rounded-t-[45px] px-4 md:px-6 py-3 md:py-4 text-center">
                  <h3 class="text-lg md:text-[26px] font-medium leading-8 text-white">Hotel Name</h3>
                </div>
                <div class="bg-brand-purple-light rounded-b-[30px] px-4 md:px-6 py-8 md:py-10 space-y-10 md:space-y-14">
                  <p class="text-base md:text-xl font-light leading-[25px] text-center">${hotel.name || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
          ${index < data.hotel.length - 1 ? '<div class="border-t border-muted-gray mt-8 md:mt-12"></div>' : ''}
        `;
        hotelsWrapper.appendChild(hotelDiv);
      });
      
      hotelBookingsContainer.appendChild(hotelsWrapper);
      console.log("✅ Updated hotel bookings:", data.hotel.length, "hotels mapped");
    } else {
      console.warn("⚠️ hotel-bookings element or hotels data not found");
    }

    // Update Flight Summary
    const sections = container.querySelectorAll("section");
    let flightSummarySection = null;
    sections.forEach(section => {
      const heading = section.querySelector("h1");
      if (heading && heading.textContent && heading.textContent.includes("Flight") && heading.textContent.includes("Summary")) {
        flightSummarySection = section;
      }
    });
    
    if (flightSummarySection && data.flights && data.flights.length > 0) {
      const flightContainer = flightSummarySection.querySelector(".space-y-3.md\\:space-y-4");
      if (flightContainer) {
        // Clear existing hardcoded flight
        flightContainer.innerHTML = '';
        
        data.flights.forEach((flight) => {
          const flightDiv = document.createElement("div");
          flightDiv.className = "grid grid-cols-1 md:grid-cols-[auto_1fr] gap-0 border border-brand-purple-dark rounded-lg overflow-hidden";
          flightDiv.style.width = "100%";
          flightDiv.style.boxSizing = "border-box";
          flightDiv.innerHTML = `
            <div class="relative bg-brand-purple-light border-r border-brand-purple-dark px-6 md:px-10 py-4 md:py-5 flex items-center">
              <span class="text-xl md:text-[26px] font-normal leading-8 whitespace-nowrap">${flight.date || 'Date TBD'}</span>
              <div class="hidden md:block absolute right-0 top-0 h-full w-8">
                <svg class="absolute right-0 top-0 h-full" width="35" height="70" viewBox="0 0 35 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M0 0L35 35L0 70V0Z" fill="#F9EEFF" stroke="#541C9C" stroke-width="1"></path>
                </svg>
              </div>
            </div>
            <div class="bg-white px-6 md:px-10 py-4 md:py-5 flex items-center">
              <p class="text-xl md:text-[26px] leading-8">
                <span class="font-bold">Fly ${flight.airline || 'Airline'} (${flight.flightNumber || 'Flight No.'})</span> 
                <span class="font-light">from ${flight.from || 'Origin'} ${flight.fromCode ? '(' + flight.fromCode + ')' : ''} to ${flight.to || 'Destination'} ${flight.toCode ? '(' + flight.toCode + ')' : ''}.</span>
              </p>
            </div>
          `;
          flightContainer.appendChild(flightDiv);
        });
        console.log("✅ Updated flight summary:", data.flights.length, "flights mapped");
      }
    } else {
      console.warn("⚠️ No flights data provided or flight section not found");
    }

    // Update Inclusion Summary Table
    let inclusionSection = null;
    sections.forEach(section => {
      const heading = section.querySelector("h2");
      if (heading && heading.textContent && heading.textContent.includes("Inclusion") && heading.textContent.includes("Summary")) {
        inclusionSection = section;
      }
    });
    
    if (inclusionSection && data.inclusionsList && data.inclusionsList.length > 0) {
      // Find the grid with 4 columns
      const inclusionGrid = inclusionSection.querySelector(".grid.grid-cols-\\[1fr_auto_2fr_1\\.5fr\\]");
      if (inclusionGrid) {
        const columns = inclusionGrid.querySelectorAll(".overflow-hidden");
        
        if (columns.length >= 4) {
          // Update Category column (first column)
          const categoryContent = columns[0].querySelector(".bg-brand-purple-light");
          if (categoryContent) {
            categoryContent.innerHTML = data.inclusionsList.map(inc => 
              `<div class="text-black text-center py-4 px-6 text-lg sm:text-xl min-h-[70px] flex items-center justify-center">${inc.category || 'N/A'}</div>`
            ).join('');
          }
          
          // Update Count column (second column)
          const countContent = columns[1].querySelector(".bg-brand-purple-light");
          if (countContent) {
            countContent.innerHTML = data.inclusionsList.map(inc => 
              `<div class="text-black text-center py-4 px-6 text-lg sm:text-xl min-h-[70px] flex items-center justify-center">${inc.count || 'N/A'}</div>`
            ).join('');
          }
          
          // Update Details column (third column)
          const detailsContent = columns[2].querySelector(".bg-brand-purple-light");
          if (detailsContent) {
            detailsContent.innerHTML = data.inclusionsList.map(inc => 
              `<div class="text-black text-center py-4 px-6 text-lg sm:text-xl min-h-[70px] flex items-center justify-center">${inc.details || 'N/A'}</div>`
            ).join('');
          }
          
          // Update Status column (fourth column)
          const statusContent = columns[3].querySelector(".bg-brand-purple-light");
          if (statusContent) {
            statusContent.innerHTML = data.inclusionsList.map(inc => 
              `<div class="text-black text-center py-4 px-6 text-lg sm:text-xl min-h-[70px] flex items-center justify-center">${inc.status || 'N/A'}</div>`
            ).join('');
          }
          
          console.log("✅ Updated inclusion summary:", data.inclusionsList.length, "inclusions mapped");
        }
      }
    } else {
      console.warn("⚠️ No inclusions data provided or inclusion section not found");
    }

    // Update Activity Table
    // Note: Activity table is NOT in a section tag, it's in a div.bg-white
    const allContainers = container.querySelectorAll("div.bg-white");
    let activityContainer = null;
    
    allContainers.forEach(div => {
      const heading = div.querySelector("h1");
      if (heading && heading.textContent && heading.textContent.includes("Activity") && heading.textContent.includes("Table")) {
        activityContainer = div;
      }
    });
    
    if (activityContainer && data.activities && data.activities.length > 0) {
      // Find the grid - it has a very specific class structure
      const activityGrid = activityContainer.querySelector(".overflow-x-auto .inline-block .grid");
      if (activityGrid) {
        const columns = activityGrid.querySelectorAll(".flex.flex-col");
        
        if (columns.length >= 4) {
          // Update City column
          const cityColumn = columns[0].querySelector(".bg-brand-purple-light");
          if (cityColumn) {
            cityColumn.innerHTML = data.activities.map(activity => 
              `<div class="px-4 md:px-6 py-3 md:py-4 text-black text-base md:text-xl font-normal leading-8 capitalize">${activity.city || 'N/A'}</div>`
            ).join('');
          }
          
          // Update Activity column
          const activityColumn = columns[1].querySelector(".bg-brand-purple-light");
          if (activityColumn) {
            activityColumn.innerHTML = data.activities.map(activity => 
              `<div class="px-4 md:px-20 py-3 md:py-4 text-black text-base md:text-xl font-normal leading-8 capitalize">${activity.name || 'N/A'}</div>`
            ).join('');
          }
          
          // Update Type column
          const typeColumn = columns[2].querySelector(".bg-brand-purple-light");
          if (typeColumn) {
            typeColumn.innerHTML = data.activities.map(activity => 
              `<div class="px-4 py-3 md:py-4 text-black text-base md:text-xl font-normal leading-8 capitalize">${activity.type || 'N/A'}</div>`
            ).join('');
          }
          
          // Update Time Required column
          const timeColumn = columns[3].querySelector(".bg-brand-purple-light");
          if (timeColumn) {
            timeColumn.innerHTML = data.activities.map(activity => 
              `<div class="px-4 py-3 md:py-4 text-black text-base md:text-xl font-normal leading-8 text-center capitalize">${activity.timeRequired || 'N/A'}</div>`
            ).join('');
          }
          
          console.log("✅ Updated activity table:", data.activities.length, "activities mapped");
        }
      }
    } else {
      console.warn("⚠️ No activities data provided or activity container not found");
    }

    // Update Payment Plan
    let paymentSection = null;
    sections.forEach(section => {
      const heading = section.querySelector("h1");
      if (heading && heading.textContent && heading.textContent.includes("Payment") && heading.textContent.includes("Plan")) {
        paymentSection = section;
      }
    });
    
    if (paymentSection) {
      // Update Total Amount
      const amountRows = paymentSection.querySelectorAll(".space-y-4 > div");
      if (amountRows.length >= 1 && data.totalAmount) {
        const amountSpan = amountRows[0].querySelector(".flex-1 span");
        if (amountSpan) {
          amountSpan.innerHTML = `<span class="font-bold">${data.totalAmount}</span><span class="font-normal"> For ${data.travellers} Pax (Inclusive Of GST)</span>`;
        }
      }
      
      // Update TCS
      if (amountRows.length >= 2 && data.tcs) {
        const tcsSpan = amountRows[1].querySelector(".flex-1 span");
        if (tcsSpan) {
          tcsSpan.textContent = data.tcs;
        }
      }
      
      // Update Payment Installments
      if (data.payments && data.payments.length > 0) {
        const paymentGrid = paymentSection.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");
        if (paymentGrid) {
          const columns = paymentGrid.querySelectorAll(".flex.flex-col");
          
          if (columns.length >= 3) {
            // Update Installment column
            const installmentColumn = columns[0].querySelector(".bg-brand-purple-light");
            if (installmentColumn) {
              installmentColumn.innerHTML = data.payments.map((payment, index) => 
                `<p class="text-center text-lg sm:text-xl lg:text-[20px] leading-8 capitalize">Installment ${index + 1}</p>`
              ).join('');
            }
            
            // Update Amount column
            const amountColumn = columns[1].querySelector(".bg-brand-purple-light");
            if (amountColumn) {
              amountColumn.innerHTML = data.payments.map(payment => 
                `<p class="text-center text-lg sm:text-xl lg:text-[20px] leading-8 capitalize">${payment.amount || 'N/A'}</p>`
              ).join('');
            }
            
            // Update Due Date column
            const dueDateColumn = columns[2].querySelector(".bg-brand-purple-light");
            if (dueDateColumn) {
              dueDateColumn.innerHTML = data.payments.map(payment => 
                `<p class="text-center text-lg sm:text-xl lg:text-[20px] leading-8 capitalize">${payment.due || payment.description || 'N/A'}</p>`
              ).join('');
            }
            
            console.log("✅ Updated payment plan:", data.payments.length, "installments mapped");
          }
        }
      }
    }

    document.body.appendChild(container);
    console.log("✅ Container appended to body");

    // Add page-break styles to prevent content from being cut
    const allSections = container.querySelectorAll("section, div[class*='bg-white']");
    allSections.forEach(section => {
      section.style.pageBreakInside = "avoid";
      section.style.breakInside = "avoid";
    });

    // Also prevent tables from breaking
    const allTables = container.querySelectorAll(".grid, table");
    allTables.forEach(table => {
      table.style.pageBreakInside = "avoid";
      table.style.breakInside = "avoid";
    });

    // Measure the actual content width to determine if we need wider pages
    const contentWidth = container.scrollWidth;
    const contentHeight = container.scrollHeight;
    console.log("📐 Content dimensions:", { width: contentWidth, height: contentHeight });

    // Convert to canvas with appropriate settings
    console.log("📸 Converting to canvas...");
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowHeight: contentHeight,
      windowWidth: contentWidth,
      allowTaint: true,
      proxy: null,
      ignoreElements: (element) => {
        return false;
      }
    });

    console.log("✅ Canvas created with size:", canvas.width, "x", canvas.height);

    // Calculate PDF dimensions based on actual content width
    const standardA4Width = 210; // mm
    const standardA4Height = 297; // mm
    
    // Determine if we need a wider page
    let pdfWidth = standardA4Width;
    let pdfHeight = standardA4Height;
    
    // If content is wider than A4, increase PDF width proportionally
    if (contentWidth > 794) { // 794px is roughly 210mm at standard resolution
      pdfWidth = (contentWidth / 794) * standardA4Width;
      console.log("📄 Using wider PDF page:", pdfWidth, "mm to accommodate wide tables");
    }

    // Calculate image dimensions for PDF
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    
    console.log("📄 Creating PDF with dimensions:", { 
      pageWidth: pdfWidth, 
      pageHeight: pdfHeight, 
      imgWidth, 
      imgHeight 
    });

    // Create PDF with custom dimensions
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
      compress: true
    });
    
    // Convert canvas to image data using JPEG
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    console.log("✅ Image data created, length:", imgData.length);

    // Smart page breaking - split content intelligently
    let currentY = 0;
    let pageCount = 1;
    const margin = 10; // 10mm margin to prevent cutoff
    
    // Add first page
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    
    // Calculate how many pages we need
    const totalPages = Math.ceil(imgHeight / pdfHeight);
    
    if (totalPages > 1) {
      console.log(`📄 Content requires ${totalPages} pages`);
      
      // Add remaining pages
      for (let page = 2; page <= totalPages; page++) {
        pdf.addPage([pdfWidth, pdfHeight], "p");
        
        // Calculate the Y position for this page
        // Add a small overlap to prevent content gaps
        const yPosition = -(page - 1) * pdfHeight;
        
        pdf.addImage(imgData, "JPEG", 0, yPosition, imgWidth, imgHeight);
        pageCount++;
      }
    }

    console.log("📄 PDF created with", pageCount, "pages");
    
    // Download the PDF
    const filename = `${(data.title || 'itinerary').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    console.log("💾 Downloading PDF as:", filename);
    pdf.save(filename);
    
    console.log("✅ PDF Generation completed successfully!");
  } catch (error) {
    console.error("❌ PDF Generation failed:", error);
    throw error;
  } finally {
    // Clean up
    const container = document.querySelector('div[style*="left: -9999px"]');
    if (container && container.parentNode) {
      document.body.removeChild(container);
      console.log("🧹 Cleanup completed");
    }
  }
};
