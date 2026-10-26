import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import RatingStars from '../../../shared/components/RatingStars';
import colors from '../../../shared/theme/colors';

export default function RateForm({ onSubmit }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (stars === 0) {
      setError('Please choose a rating');
      return;
    }
    if (comment.trim().length < 5) {
      setError('Comment must be at least 5 characters');
      return;
    }

    setError('');
    onSubmit(stars, comment.trim());
    setStars(0);
    setComment('');
  }

  return (
    <View style={styles.box}>
      <RatingStars rating={stars} size={30} onSelect={setStars} />

      <TextInput
        value={comment}
        onChangeText={setComment}
        placeholder="Write a short comment"
        placeholderTextColor={colors.muted}
        multiline
        style={styles.input}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Rating</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  input: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    minHeight: 70,
    textAlignVertical: 'top',
    color: colors.text,
  },
  error: {
    color: colors.error,
    alignSelf: 'flex-start',
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.card,
    fontWeight: '600',
  },
});