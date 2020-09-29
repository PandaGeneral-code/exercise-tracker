import { Button } from "antd";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";

import { Container, Wrapper } from "./styled";

export const TestUI = () => {
  const [selected, setSelected] = useState(null);

  return (
    <AnimateSharedLayout>
      <motion.div
        layout
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <motion.div
            key={item}
            layout
            onClick={() => {
              setSelected((selected) => {
                console.log(selected);
                if (selected === item) {
                  return null;
                } else {
                  return item;
                }
              });
            }}
            style={{
              backgroundColor: item % 2 === 0 ? "#e24e42" : "#e9b000",
              flex: 1,
            }}
          >
            {selected === item ? (
              <AnimatePresence>
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <h1>{item}</h1>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                  <div>Hello from the other side</div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <h1>{item}</h1>
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimateSharedLayout>
  );
};
