import { useState } from "react";
import { Box, Grid, Heading, Button, Text, Select, Input, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useBreakpointValue } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaFilter, FaPlus } from "react-icons/fa";

const Index = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    setSelectedDay(null);
  };

  const changeDay = (offset) => {
    const newDay = new Date(selectedDay);
    newDay.setDate(newDay.getDate() + offset);
    setSelectedDay(newDay);
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    onModalOpen();
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    onModalClose();
  };

  const openFilterDrawer = () => {
    onDrawerOpen();
  };

  const closeFilterDrawer = () => {
    onDrawerClose();
  };

  const renderCalendar = () => {
    if (view === "day") {
    } else {
    }
  };

  return (
    <Box p={4}>
      <Flex align="center" justify="space-between" mb={4}>
        <Heading size="lg">Calendar</Heading>
        <Flex>
          <Select
            value={view}
            onChange={(e) => {
              setView(e.target.value);
              if (e.target.value === "day") {
                setSelectedDay(currentDate);
              } else {
                setSelectedDay(null);
              }
            }}
            mr={2}
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
            <option value="day">Day</option>
          </Select>
          <Button leftIcon={<FaFilter />} onClick={openFilterDrawer}>
            Filter
          </Button>
          <Button leftIcon={<FaPlus />} colorScheme="blue" ml={2} onClick={() => openEventModal(null)}>
            New Event
          </Button>
        </Flex>
      </Flex>
      <Flex align="center" justify="space-between" mb={4}>
        <Button leftIcon={<FaChevronLeft />} onClick={() => (view === "day" ? changeDay(-1) : changeMonth(-1))}>
          Prev
        </Button>
        <Heading size="md">{view === "day" ? selectedDay.toLocaleString("default", { weekday: "long", month: "long", day: "numeric" }) : currentDate.toLocaleString("default", { month: "long", year: "numeric" })}</Heading>
        <Button rightIcon={<FaChevronRight />} onClick={() => (view === "day" ? changeDay(1) : changeMonth(1))}>
          Next
        </Button>
      </Flex>
      <Box>{renderCalendar()}</Box>

      <Modal isOpen={isModalOpen} onClose={closeEventModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEvent ? "Edit Event" : "New Event"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* Render event form */}</ModalBody>
          <ModalFooter>
            <Button onClick={closeEventModal}>Cancel</Button>
            <Button colorScheme="blue" ml={2}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Drawer placement={isMobile ? "bottom" : "right"} onClose={closeFilterDrawer} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Events</DrawerHeader>
          <DrawerBody>{/* Render filter options */}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Index;
