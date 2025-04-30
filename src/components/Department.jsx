import React, { useEffect, useMemo } from "react";
import cl from "../styles/Department.module.css";
import Category from "./Category";

const Department = ({
  selectedCategory,
  categories,
  products,
  language,
  setSelectedCategory,
}) => {
  return (
    <div className={cl.department}>
      {categories.map((category) => (
        <Category
          key={category.name_en}
          setSelectedCategory={setSelectedCategory}
          category={category}
          products={products}
          language={language}
        />
      ))}
    </div>
  );
};

export default Department;
