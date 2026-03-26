"use client";
import React from "react";
import { premiumStyles } from "./constants";
import DahejHero from "./DahejHero";
import DahejForm from "./DahejForm";
import DahejResult from "./DahejResult";
import { useDahejCalculator } from "./useDahejCalculator";

const DahejCalculatorPage = () => {
    const {
        lang,
        toggleLang,
        t,
        fullName,
        setFullName,
        job,
        setJob,
        dob,
        setDob,
        salary,
        setSalary,
        loading,
        result,
        resultsRef,
        canCalculate,
        calculate,
    } = useDahejCalculator();

    return (
        <div className="min-h-screen bg-[#fffaf7] selection:bg-[#d4af37]/20 uppercase">
            <style dangerouslySetInnerHTML={{ __html: premiumStyles }} />

            <DahejHero lang={lang} toggleLang={toggleLang} t={t} />

            <DahejForm
                t={t}
                fullName={fullName}
                setFullName={setFullName}
                job={job}
                setJob={setJob}
                dob={dob}
                setDob={setDob}
                salary={salary}
                setSalary={setSalary}
                loading={loading}
                canCalculate={canCalculate}
                handleCalculate={(e) => {
                    e.preventDefault();
                    calculate();
                }}
            />

            <div ref={resultsRef}>
                {result && <DahejResult result={result} t={t} />}
            </div>
        </div>
    );
};

export default DahejCalculatorPage;
