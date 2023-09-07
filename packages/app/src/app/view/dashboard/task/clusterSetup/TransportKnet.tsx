import React from "react";
import {
  Alert,
  Grid,
  GridItem,
  Tab,
  TabTitleIcon,
  TabTitleText,
  Tabs,
} from "@patternfly/react-core";
import {PlusIcon, TimesIcon} from "@patternfly/react-icons";

import {TaskLibStep} from "app/view/share";

import {useTask} from "./useTask";
import {TransportKnetLink} from "./TransportKnetLink";

type Link = Parameters<ReturnType<typeof useTask>["updateLinkKnet"]>[0];
type TabIndex = Parameters<
  NonNullable<React.ComponentProps<typeof Tabs>["onSelect"]>
>[1];

const ADD_LINK = "add";
const NO_LINK = "no link";
const MAX_LINKS = 8;

export const TransportKnet = ({linkList}: {linkList: Link[]}) => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState<
    Link["linknumber"] | typeof NO_LINK
  >(0);
  const {
    setLinksKnet,
    allReports,
    filledNodeNameList,
    areLinksValid,
    state: {showValidationErrors},
  } = useTask();

  const removeLink = React.useCallback(
    (linkNumber: number) => (e: React.MouseEvent) => {
      e.stopPropagation();
      setLinksKnet([
        ...linkList.filter(link => link.linknumber < linkNumber),
        ...linkList
          .filter(link => link.linknumber > linkNumber)
          .map(link => ({
            ...link,
            linknumber: (link.linknumber - 1) as Link["linknumber"],
          })),
      ]);
      if (linkNumber === currentTabIndex) {
        setCurrentTabIndex(NO_LINK);
        return;
      }
      if (currentTabIndex !== NO_LINK && currentTabIndex > linkNumber) {
        setCurrentTabIndex((currentTabIndex - 1) as Link["linknumber"]);
      }
    },
    [linkList, setLinksKnet, currentTabIndex],
  );

  const newLink = React.useCallback(
    (linknumber: Link["linknumber"]) =>
      setLinksKnet([
        ...linkList,
        {
          linknumber,
          addresses: filledNodeNameList.reduce(
            (addrs, nodeName) => ({
              ...addrs,
              [nodeName]: "",
            }),
            {},
          ),
        },
      ]),
    [linkList, filledNodeNameList, setLinksKnet],
  );

  const selectLink = React.useCallback(
    (_event: unknown, tabIndex: TabIndex) => {
      if (tabIndex !== ADD_LINK) {
        setCurrentTabIndex(tabIndex as Link["linknumber"]);
        return;
      }
      newLink(linkList.length as Link["linknumber"]);
      setCurrentTabIndex(linkList.length as Link["linknumber"]);
    },
    [linkList, newLink],
  );

  return (
    <TaskLibStep title="Knet transport" reports={allReports}>
      {!areLinksValid && showValidationErrors && (
        <Alert
          variant="danger"
          isInline
          title={`Unfilled addresses for links: ${linkList
            .filter(link =>
              Object.values(link.addresses).some(
                address => address.length === 0,
              ),
            )
            .map(link => `Link ${link.linknumber}`)
            .join(", ")}`}
        />
      )}
      <Grid>
        <GridItem span={2}>
          <Tabs
            isVertical
            isBox
            activeKey={currentTabIndex}
            onSelect={selectLink}
          >
            {linkList.map(link => (
              <Tab
                key={link.linknumber}
                eventKey={link.linknumber}
                title={
                  <>
                    <TabTitleText>{`Link ${link.linknumber}`}</TabTitleText>
                    <TabTitleIcon onClick={removeLink(link.linknumber)}>
                      <TimesIcon />
                    </TabTitleIcon>
                  </>
                }
              />
            ))}
            {linkList.length < MAX_LINKS && (
              <Tab
                key={ADD_LINK}
                eventKey={ADD_LINK}
                title={
                  <>
                    <TabTitleIcon>
                      <PlusIcon />
                    </TabTitleIcon>
                    <TabTitleText data-test="knet-link-add">
                      Add Link
                    </TabTitleText>
                  </>
                }
              />
            )}
          </Tabs>
        </GridItem>
        <GridItem span={10}>
          {linkList.length > 0 && currentTabIndex !== NO_LINK && (
            <TransportKnetLink link={linkList[currentTabIndex]} />
          )}
        </GridItem>
      </Grid>
    </TaskLibStep>
  );
};
