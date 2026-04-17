import React from "react";
import {Popover} from "@patternfly/react-core";
import {QuestionCircleIcon} from "@patternfly/react-icons";
import {global_disabled_color_100 as helpColor} from "@patternfly/react-tokens";

import {age, ageLabel} from "app/view/share";

export const SecretsAgePopover = ({when}: {when: number}) => {
  const [ageSeconds, setAgeSeconds] = React.useState(age(when));

  React.useEffect(() => {
    setAgeSeconds(age(when));
    const interval = setInterval(() => setAgeSeconds(age(when)), 5000);
    return () => clearInterval(interval);
  }, [when]);

  return (
    <Popover
      bodyContent={
        <>
          <div>{`Loaded ${ageLabel(ageSeconds)}.`}</div>
          Secret values are loaded once when revealed. To get fresh values, hide
          and reveal secrets again.
        </>
      }
    >
      <QuestionCircleIcon color={helpColor.var} />
    </Popover>
  );
};
