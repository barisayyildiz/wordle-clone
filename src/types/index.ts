export type GuessedLetterStatus = ("correct" | "present" | "absent")

export type BoardColorsType = GuessedLetterStatus[];

export type TurkishAlphabet = "A" | "B" | "C" | "Ç" | "D" | "E" | "F" | "G" | "Ğ" | "H" | "I" | "İ" | "J" | "K" | "L" | "M" | "N" | "O" | "Ö" | "P" | "R" | "S" | "Ş" | "T" | "U" | "Ü" | "V" | "Y" | "Z";

export type GuessedLetters = {
  [Letter in TurkishAlphabet]?: GuessedLetterStatus;
};


