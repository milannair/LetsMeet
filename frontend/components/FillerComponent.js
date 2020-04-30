import React from 'react';

function FillerComponent() {
  (
    <View>
      <Text style={styles.text}>
        Test
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
    fontSize: 24
  }
});

export default FillerComponent;