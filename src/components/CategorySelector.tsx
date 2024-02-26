import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@utils/colors';
import { fonts } from '@utils/fonts';
import React, { FC } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title: string;
}

const CategorySelector: FC<Props> = ({ visible = false, title }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.backdrop} />

      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView>
            <Pressable style={styles.selectorContainer}>
              <MaterialCommunityIcons
                name="radiobox-marked"
                color={colors.PRIMARY}
              />
              <Text style={{ padding: 10 }}>Category 1</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONSTRAT,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalContent: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: colors.LIGHT_GREEN,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.blackItalic,
    color: colors.PRIMARY,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});

export default CategorySelector;
