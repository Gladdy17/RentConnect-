export const getImageURL = (type) => {
          const fallback = "/images/fallback.jpg";
          if (typeof type === "string" && type.trim() !== "") {
            const formatted = type.toLowerCase().trim().replace(/_/g, " ");
            return `/images/${formatted}.jpg`;
          }
          return fallback;
        };