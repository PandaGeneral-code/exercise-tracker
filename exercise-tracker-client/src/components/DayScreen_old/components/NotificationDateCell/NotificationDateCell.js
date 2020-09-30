import { Badge } from "antd";
import React from "react";

import { Wrapper } from "./styled";

export const NotificationDateCell = (value, data) => {
  console.log(data);
  const thisDate = value.date();
  const thisDataFormatted = value.format("LL");
  return (
    <Wrapper>
      {Object.keys(data).includes(thisDataFormatted) && <Badge count={4} />}
    </Wrapper>
  );
};

//TODO:
// const dateCellRender = (value) => {
//   const thisDate = value.date();
//   const thisDataFormatted = value.format("LL");
//   return (
//     <Badge
//       dot={Object.keys(data).includes(thisDataFormatted)}
//       style={{ backgroundColor: "red" }}
//     >
//       <div>
//         {
//           <DateTextContainer
//             date={value?.format("LL")}
//             selectedDate={selectedDate?.format("LL")}
//             today={today?.format("LL")}
//           >
//             <div>{thisDate}</div>
//           </DateTextContainer>
//         }
//       </div>
//     </Badge>
//   );
// };
