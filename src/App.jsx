import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import ModalLanguage from "./components/ModalLanguage";
import { API_BAR, API_KITCHEN, API_SPECIAL } from "./helpers/const";
import axios from "axios";
import * as XLSX from "xlsx";

const App = () => {
  const [kitchenWorkbook, setKitchenWorkbook] = useState(null);
  const [barWorkbook, setBarWorkbook] = useState(null);
  const [specialWorkbook, setSpeacialWorkbook] = useState(null);
  const kitchenFilePath = process.env.PUBLIC_URL + "../kitchen.xlsx";
  const specialFilePath = process.env.PUBLIC_URL + "../special.xlsx";
  const barFilePath = process.env.PUBLIC_URL + "../bar.xlsx";

  useEffect(() => {
    // Загружаем файл из public
    fetch(kitchenFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setKitchenWorkbook(parserWorkbook(workbook));
      })
      .catch((err) => console.error("Ошибка чтения Excel:", err));
    fetch(barFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setBarWorkbook(parserWorkbook(workbook));
      })
      .catch((err) => console.error("Ошибка чтения Excel:", err));
    fetch(specialFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setSpeacialWorkbook(parserWorkbook(workbook));
      })
      .catch((err) => console.error("Ошибка чтения Excel:", err));
  }, []);

  const [language, setLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalLanguage, setIsOpenModalLanguage] = useState(false);

  const parser = (dataArr, firstRow) => {
    let obj = {};
    obj = dataArr.map((el) => {
      let r = el.reduce((res, cur, index) => {
        res[firstRow[index]] = cur;
        return res;
      }, {});
      return r;
    });

    obj = obj.filter((item) => item.title_en !== "");

    return obj;
  };

  const parserWorkbook = (wokrbook) => {
    const sheetNames = wokrbook.SheetNames;
    const result = {};
    for (let i = 0; i < sheetNames.length; i++) {
      const worksheet = wokrbook.Sheets[sheetNames[i]];
      const list = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const cleanedData = list.filter((row) => row.length);
      let firstRow = cleanedData.shift();
      result[sheetNames[i]] = parser(cleanedData, firstRow);
    }
    return result;
  };

  const bar = useMemo(() => {
    const keys = Object.keys(barWorkbook ?? {});
    return keys.reduce((acc, cur) => {
      if (cur === "catalogs") return { ...acc };
      return { ...acc, [cur]: barWorkbook[cur] };
    }, {});
  }, [barWorkbook]);
  const kitchen = useMemo(() => {
    const keys = Object.keys(kitchenWorkbook ?? {});
    return keys.reduce((acc, cur) => {
      if (cur === "catalogs") return { ...acc };
      return { ...acc, [cur]: kitchenWorkbook[cur] };
    }, {});
  }, [kitchenWorkbook]);
  const special = useMemo(() => {
    const keys = Object.keys(specialWorkbook ?? {});
    return keys.reduce((acc, cur) => {
      if (cur === "catalogs") return { ...acc };
      return { ...acc, [cur]: specialWorkbook[cur] };
    }, {});
  }, [specialWorkbook]);

  const catalogBar = useMemo(() => {
    return barWorkbook?.catalogs || [];
  }, [barWorkbook]);
  const catalogKitchen = useMemo(() => {
    return kitchenWorkbook?.catalogs || [];
  }, [kitchenWorkbook]);
  const catalogSpecial = useMemo(() => {
    return specialWorkbook?.catalogs || [];
  }, [specialWorkbook]);

  const [selectedCatalog, setSelectedCatalog] = useState("special");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [isLoadingKitchen, setIsLoadingKitchen] = useState(false);
  const [isLoadingSpecial, setIsLoadingSpecial] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("language"));
    if (local) setLanguage(local);
    document.body.style.overflow = "hidden";
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (language) {
      localStorage.setItem("language", JSON.stringify(language));
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
    }
    setIsOpenModalLanguage(false);
  }, [language]);

  useEffect(() => {
    document.body.style.overflow = isOpenModalLanguage ? "hidden" : "auto";
  }, [isOpenModalLanguage]);

  return (
    <div>
      <Header
        setIsOpenModalLanguage={setIsOpenModalLanguage}
        catalogBar={catalogBar}
        language={language}
        catalogKitchen={catalogKitchen}
        catalogSpecial={catalogSpecial}
        setSelectedCatalog={setSelectedCatalog}
        setSelectedCategory={setSelectedCategory}
        selectedCatalog={selectedCatalog}
        selectedCategory={selectedCategory}
      />
      <main>
        <Menu
          language={language}
          bar={bar}
          kitchen={kitchen}
          special={special}
          catalogBar={catalogBar}
          catalogKitchen={catalogKitchen}
          catalogSpecial={catalogSpecial}
          selectedCatalog={selectedCatalog}
          selectedCategory={selectedCategory}
          isLoadingBar={isLoadingBar}
          isLoadingKitchen={isLoadingKitchen}
          setSelectedCategory={setSelectedCategory}
        />
      </main>
      <Footer
        language={language}
        setIsOpenModalLanguage={setIsOpenModalLanguage}
      />
      {isLoading ? (
        language && !isOpenModalLanguage ? null : (
          <ModalLanguage language={language} setLanguage={setLanguage} />
        )
      ) : null}
    </div>
  );
};

export default App;
