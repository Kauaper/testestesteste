import { Image } from "expo-image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export type GalleryPhoto = {
  id: string;
  uri: string;
  title?: string;
  description?: string;
};

type PhotoGalleryModalProps = {
  visible: boolean;
  photos: GalleryPhoto[];
  initialIndex?: number;
  onClose: () => void;
};

/**
 * Visualizador de galeria em tela cheia.
 * Cada foto ocupa a tela inteira e a navegação acontece rolando para baixo
 * (sem setas laterais).
 */
export function PhotoGalleryModal({
  visible,
  photos,
  initialIndex = 0,
  onClose,
}: PhotoGalleryModalProps) {
  const { width, height } = useWindowDimensions();
  const listRef = useRef<FlatList<GalleryPhoto>>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const clamp = useCallback(
    (index: number) =>
      Math.min(Math.max(index, 0), Math.max(photos.length - 1, 0)),
    [photos.length],
  );

  useEffect(() => {
    if (!visible) {
      return;
    }

    const safeIndex = clamp(initialIndex);
    setActiveIndex(safeIndex);

    const timeout = setTimeout(() => {
      listRef.current?.scrollToOffset({
        offset: safeIndex * height,
        animated: false,
      });
    }, 0);

    return () => clearTimeout(timeout);
  }, [visible, initialIndex, height, clamp]);

  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.y / height);
      setActiveIndex(clamp(index));
    },
    [height, clamp],
  );

  const renderItem = useCallback(
    ({ item }: { item: GalleryPhoto }) => (
      <View style={[styles.page, { width, height }]}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            contentFit="contain"
            transition={200}
            accessibilityLabel={item.title ?? "Foto da galeria"}
          />
        </View>

        {(item.title || item.description) && (
          <View style={styles.caption}>
            {item.title ? <Text style={styles.title}>{item.title}</Text> : null}
            {item.description ? (
              <Text style={styles.description}>{item.description}</Text>
            ) : null}
          </View>
        )}
      </View>
    ),
    [width, height],
  );

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <View style={styles.container}>
        {photos.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhuma foto para mostrar.</Text>
          </View>
        ) : (
          <FlatList
            ref={listRef}
            data={photos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            snapToInterval={height}
            snapToAlignment="start"
            decelerationRate="fast"
            disableIntervalMomentum
            onMomentumScrollEnd={handleMomentumEnd}
            initialNumToRender={1}
            maxToRenderPerBatch={2}
            windowSize={3}
            removeClippedSubviews
            getItemLayout={(_, index) => ({
              length: height,
              offset: height * index,
              index,
            })}
          />
        )}

        <View style={styles.header} pointerEvents="box-none">
          <Pressable
            onPress={onClose}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Fechar galeria"
            hitSlop={12}
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>

        {photos.length > 1 && (
          <View style={styles.footer} pointerEvents="none">
            <Text style={styles.counter}>
              {activeIndex + 1} / {photos.length}
            </Text>
            {activeIndex < photos.length - 1 && (
              <Text style={styles.hint}>Role para baixo para ver mais ↓</Text>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  page: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 88,
    paddingBottom: 96,
    paddingHorizontal: 12,
  },

  imageWrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  caption: {
    marginTop: 16,
    paddingHorizontal: 8,
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  description: {
    color: "#E5E7EB",
    fontSize: 15,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 22,
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 48,
    paddingHorizontal: 20,
    alignItems: "flex-end",
  },

  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 32,
    alignItems: "center",
  },

  counter: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
  },

  hint: {
    color: "#D1D5DB",
    fontSize: 13,
    marginTop: 8,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emptyText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
});
