import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import ModalLanguage from "./components/ModalLanguage";
import { TABS } from "./helpers/const";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";

const App = () => {
  const [kitchenWorkbook, setKitchenWorkbook] = useState(null);
  const [barWorkbook, setBarWorkbook] = useState(null);
  const [specialWorkbook, setSpeacialWorkbook] = useState(null);

  const [magnoliaKitchenWorkbook, setMagnoliaKitchenWorkbook] = useState(null);
  const [magnoliaBarWorkbook, setMagnoliaBarWorkbook] = useState(null);
  const [magnoliaSpecialWorkbook, setMagnoliaSpecialWorkbook] = useState(null);

  const location = useLocation();
  const isMagnolia = useMemo(() => {
    return (
      location.pathname === "/magnolia" || location.pathname === "/magnolia/"
    );
  }, [location]);
  const coffeeKitchenFilePath =
    process.env.PUBLIC_URL + "../coffee/kitchen.xlsx";
  const coffeeSpecialFilePath =
    process.env.PUBLIC_URL + "../coffee/special.xlsx";
  const coffeeBarFilePath = process.env.PUBLIC_URL + "../coffee/bar.xlsx";

  const magnoliaBarFilePath = process.env.PUBLIC_URL + "../magnolia/bar.xlsx";
  const magnoliaKitchenFilePath =
    process.env.PUBLIC_URL + "../magnolia/kitchen.xlsx";
  const magnoliaSpecialFilePath =
    process.env.PUBLIC_URL + "../magnolia/special.xlsx";

  useEffect(() => {
    // Загружаем файл из public
    fetch(coffeeKitchenFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setKitchenWorkbook(parserWorkbook(workbook));
      })
      .catch((err) => console.error("Ошибка чтения Excel:", err));
    fetch(coffeeBarFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setBarWorkbook(parserWorkbook(workbook));
      })
      .catch((err) => console.error("Ошибка чтения Excel:", err));
    fetch(coffeeSpecialFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setSpeacialWorkbook(parserWorkbook(workbook));
      })
      .catch((err) => console.error("Ошибка чтения Excel:", err));
    fetch(magnoliaSpecialFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setMagnoliaSpecialWorkbook(parserWorkbook(workbook));
      })
      .catch((err) => console.error("Ошибка чтения Excel:", err));
    fetch(magnoliaBarFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setMagnoliaBarWorkbook(parserWorkbook(workbook));
      })
      .catch((err) => console.error("Ошибка чтения Excel:", err));
    fetch(magnoliaKitchenFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        setMagnoliaKitchenWorkbook(parserWorkbook(workbook));
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
    Object.keys(result).map((key) => {
      const fortmatted = result[key].filter(
        ({ title_en, title_ru, title_ge, name_en, name_ru, name_ge }) =>
          title_en || title_ru || title_ge || name_en || name_ru || name_ge
      );
      result[key] = fortmatted;
    });
    return result;
  };

  const bar = useMemo(() => {
    const workbook = isMagnolia ? magnoliaBarWorkbook : barWorkbook;
    const keys = Object.keys(workbook ?? {});
    return keys.reduce((acc, cur) => {
      if (cur === "catalogs" || !cur) return { ...acc };
      return { ...acc, [cur]: workbook[cur] };
    }, {});
  }, [barWorkbook, isMagnolia, magnoliaBarWorkbook]);

  const kitchen = useMemo(() => {
    const workbook = isMagnolia ? magnoliaKitchenWorkbook : kitchenWorkbook;
    const keys = Object.keys(workbook ?? {});
    return keys.reduce((acc, cur) => {
      if (cur === "catalogs" || !cur) return { ...acc };
      return { ...acc, [cur.toLowerCase()]: workbook[cur] };
    }, {});
  }, [kitchenWorkbook, isMagnolia, magnoliaKitchenWorkbook]);

  const special = useMemo(() => {
    const workbook = isMagnolia ? magnoliaSpecialWorkbook : specialWorkbook;
    const keys = Object.keys(workbook ?? {});
    return keys.reduce((acc, cur) => {
      if (cur === "catalogs" || !cur) return { ...acc };
      return { ...acc, [cur.toLowerCase()]: workbook[cur] };
    }, {});
  }, [isMagnolia, magnoliaSpecialWorkbook, specialWorkbook]);

  const catalogBar = useMemo(() => {
    if (isMagnolia) return magnoliaBarWorkbook?.catalogs || [];
    return barWorkbook?.catalogs || [];
  }, [barWorkbook, magnoliaBarWorkbook, isMagnolia]);
  const catalogKitchen = useMemo(() => {
    if (isMagnolia) return magnoliaKitchenWorkbook?.catalogs || [];
    return kitchenWorkbook?.catalogs || [];
  }, [kitchenWorkbook, magnoliaKitchenWorkbook, isMagnolia]);
  const catalogSpecial = useMemo(() => {
    if (isMagnolia) return magnoliaSpecialWorkbook?.catalogs || [];
    return specialWorkbook?.catalogs || [];
  }, [specialWorkbook, magnoliaSpecialWorkbook, isMagnolia]);

  const CATALOG_TAB_MAP = useMemo(
    () => ({
      kitchen: catalogKitchen,
      special: catalogSpecial,
      bar: catalogBar,
    }),
    [catalogBar, catalogKitchen, catalogSpecial]
  );

  const tabsFiltered = useMemo(() => {
    return TABS.filter(({ key }) => CATALOG_TAB_MAP[key]?.length) || [];
  }, [CATALOG_TAB_MAP]);

  useEffect(() => {
    const catalog = tabsFiltered[0]?.key;
    console.log(magnoliaSpecialWorkbook);
    if (catalog) setSelectedCatalog(catalog);
  }, [tabsFiltered]);

  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isLoadingBar, setIsLoadingBar] = useState(false);
  const [isLoadingKitchen, setIsLoadingKitchen] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("language"));
    if (local) setLanguage(local);
    document.body.style.overflow = "hidden";
    setIsLoading(true);

    const catalog = tabsFiltered[0]?.key;
    if (catalog) setSelectedCatalog(catalog);
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
        language={language}
        setIsOpenModalLanguage={setIsOpenModalLanguage}
        catalogBar={catalogBar}
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
