import React from "react";
import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
// Oficial patternfly react table is a bit complex. So direct css is sometimes
// used for more lightweight components.  But styles are not loaded when
// paternfly-react Table component is not used. So, table styles are explicitly
// linked here until better way is discovered.
import "@patternfly/patternfly/layouts/Split/split.css";
import "@patternfly/patternfly/components/Table/table.css";
import "@patternfly/patternfly/components/Table/table-grid.css";
import "@patternfly/react-styles/css/layouts/Flex/flex.css";
import "@patternfly/react-styles/css/utilities/Flex/flex.css";
import "@patternfly/react-styles/css/utilities/Spacing/spacing.css";
import "@patternfly/react-styles/css/utilities/Sizing/sizing.css";
import "@patternfly/react-styles/css/components/AlertGroup/alert-group.css";
import "@patternfly/react-styles/css/components/Card/card.css";
import "@patternfly/react-styles/css/components/Content/content.css";
import "@patternfly/react-styles/css/components/Radio/radio.css";

import { App } from "app/view/scenes/App";

ReactDOM.render(<App />, document.getElementById("root"));
