import React, { createRef, useEffect, useMemo, useRef } from "react";
import cl from "../styles/Header.module.css";
import { Corn } from "../helpers/icons";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { LOCALES } from "../locales";
import { useLocation } from "react-router-dom";
import { TABS } from "../helpers/const";

const Header = ({
  setIsOpenModalLanguage,
  catalogBar,
  catalogKitchen,
  catalogSpecial,
  language,
  setSelectedCatalog,
  setSelectedCategory,
  selectedCatalog,
  selectedCategory,
}) => {
  const handleClickChangeLang = () => {
    setIsOpenModalLanguage(true);
  };

  const count_corn = Array.from({ length: 100 }, () => "");

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const cornRef = createRef();
  cornRef.current = [];
  const headerRef = useRef();

  let stateScroll = window.innerWidth;
  const setStateScroll = (data) => (scrolling += data);

  useEffect(() => {
    setStateScroll(window.innerWidth);

    try {
      const { width } = document.body?.getBoundingClientRect();
      const { height } = headerRef.current?.getBoundingClientRect();
      gsapTrigger(width, height);
    } catch (error) {
      console.log(error);
    }

    window.addEventListener("resize", (e) => {
      if (stateScroll !== window.innerWidth) {
        setStateScroll(window.innerWidth);
        try {
          const { width } = document.body?.getBoundingClientRect();
          const { height } = headerRef.current?.getBoundingClientRect();
          gsapTrigger(width, height);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, []);

  let scrolling = false;

  const gsapTrigger = (width, height) => {
    cornRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        {
          transform: `
						translate(${getRandomInt(1, width)}px, ${getRandomInt(1, height)}px)
						rotate(${getRandomInt(0, 180)}deg)
						scale(0)
					`,
          duration: 1,
        },
        {
          transform: `
						translate(${getRandomInt(1, width)}px, ${getRandomInt(1, height)}px)
						rotate(${getRandomInt(0, 180)}deg)
						scale(${getRandomArbitrary(0.5, 1.5)})
					`,
          duration: 2.5,
        }
      );
    });
  };

  const addtoRefs = (el) => {
    if (el && !cornRef.current.includes(el)) {
      cornRef.current.push(el);
    }
  };

  const handleClickTab = (tab) => {
    setSelectedCatalog(tab.key);
    const catalog = CATALOG_TAB_MAP[tab.key];
    setSelectedCategory(catalog[0].name_en);
  };

  const CATALOG_TAB_MAP = useMemo(
    () => ({
      kitchen: catalogKitchen,
      special: catalogSpecial,
      bar: catalogBar,
    }),
    [catalogBar, catalogKitchen, catalogSpecial]
  );

  const handleClickCategory = (category) => {
    setSelectedCategory(category.name_en);
    const element = document.getElementById(category.name_en);
    if (element) {
      element.scrollIntoView();
    }
  };

  const catalog = useMemo(() => {
    return CATALOG_TAB_MAP[selectedCatalog] || [];
  }, [CATALOG_TAB_MAP, selectedCatalog]);

  const tabsFiltered = useMemo(() => {
    return TABS.filter(({ key }) => CATALOG_TAB_MAP[key]?.length);
  }, [CATALOG_TAB_MAP]);

  const location = useLocation();
  const isMagnolia = useMemo(() => {
    return (
      location.pathname === "/magnolia" || location.pathname === "/magnolia/"
    );
  }, [location]);

  return (
    <>
      <header
        ref={headerRef}
        className={[cl.header, cl.headerRef].join(" ")}
        style={{
          background: "var(--beige)",
          height: "103px",
          position: "sticky",
          top: "0",
          zIndex: "100",
          overflow: "hidden",
        }}
      >
        <div className={cl.wrapper}>
          <div className={cl.logo}>
            <a className={cl.logo__img} href={window.location.href}>
              <span>SAGE</span>
              <span>{isMagnolia ? "magnolia" : "coffee"}</span>
            </a>
          </div>
          <div
            className={cl.icon_language}
            onClick={() => handleClickChangeLang()}
          >
            <FontAwesomeIcon size="xl" icon={faGlobe} />
          </div>
        </div>
        {count_corn.map((_, i) => (
          <Corn
            setRef={addtoRefs}
            key={i}
            style={{
              width: "10px",
              height: "20px",
              position: "absolute",
            }}
          />
        ))}
      </header>
      <div className={cl.tabs}>
        {tabsFiltered.map((tab) => (
          <div
            key={tab.key}
            className={[
              cl.tab,
              selectedCatalog === tab.key && cl.tab_selected,
            ].join(" ")}
            onClick={() => handleClickTab(tab)}
          >
            {LOCALES[language]?.departments[tab.key]}
          </div>
        ))}
      </div>
      <div className={cl.list_categories}>
        {catalog.map((category, index) => (
          <div
            key={category.name_en}
            className={[
              cl.category,
              selectedCategory === category.name_en && cl.category_selected,
            ].join(" ")}
            onClick={() => handleClickCategory(category)}
          >
            {category["name_" + language]}
            {catalog.length - 1 !== index ? <span>&bull;</span> : null}
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;
