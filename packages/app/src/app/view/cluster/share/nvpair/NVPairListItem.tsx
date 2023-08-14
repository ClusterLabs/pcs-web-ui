import {NVPair} from "app/view/cluster/types";

import {NVPairListItemContextProvider} from "./NVPairListItemContext";

export const NVPairListItem = (props: {
  nvPair: NVPair;
  menu: React.ReactNode;
  name: (name: string) => React.ReactNode;
  value: (value: string) => React.ReactNode;
}) => {
  return (
    <NVPairListItemContextProvider value={props.nvPair}>
      <tr key={props.nvPair.id}>
        <td data-label="name">{props.name(props.nvPair.name)}</td>
        <td data-label="value">{props.value(props.nvPair.value)}</td>
        <td data-label="Menu">{props.menu}</td>
      </tr>
    </NVPairListItemContextProvider>
  );
};
