#[allow(dead_code)]
pub struct GapBuffer {
    pub length: usize,     // size of string in GapBuffer without gap
    pub buffer: Vec<char>, // actuall string or vec<char> with gap
    pub gap_size: usize,   // size of gap
    pub gap_start: usize,  // index where gap starts
}

impl GapBuffer {
    pub fn new(str: &str) -> Self {
        // A copy of &str will be created in heap
        let mut buffer: Vec<char> = str.chars().collect();
        let len = buffer.len();
        buffer.extend(std::iter::repeat(' ').take(6));
        Self {
            length: buffer.len(),
            buffer,
            gap_size: 6,
            gap_start: len,
        }
    }
    fn left_shift(&mut self, pos: usize, gap_end: usize) {
        //move buffer[pos..gap_start] -> buffer[gap_end-len..]
        let len = self.gap_start - pos;
        self.buffer.copy_within(pos..self.gap_start, gap_end - len);
        self.gap_start = pos;
    }
    fn right_shift(&mut self, pos: usize, gap_end: usize) {
        //move buffer[gap_end..len] -> buffer[gap_start..]
        self.buffer
            .copy_within(gap_end..pos + self.gap_size, self.gap_start);
        self.gap_start = pos;
    }
    fn point_cursor(&mut self, pos: usize) {
        let gap_end = self.gap_size + self.gap_start;
        if pos > self.buffer.len() - self.gap_size {
            return;
        }
        if self.gap_start > pos {
            self.left_shift(pos, gap_end);
        } else {
            self.right_shift(pos, gap_end);
        }
    }
    fn add_gap(&self, string: &mut String) -> usize {
        // new_gap is added to the new_string
        let new_gap = 6 - self.gap_size;
        if new_gap > 0 {
            for _ in 0..new_gap {
                string.push(' ');
            }
            return new_gap;
        }
        return 0;
    }

    pub fn insert(&mut self, pos: usize, string: &str) {
        // Append if pos is end of buffer.
        if pos == self.buffer.len() - self.gap_size {
            self.buffer.extend(string.chars());
            self.length += string.len();
            return;
        }
        self.point_cursor(pos);
        if string.len() > self.gap_size {
            //insert vec<string+new_gap>
            let mut new_string = String::from(string);
            if self.gap_size < 6 {
                self.gap_size += self.add_gap(&mut new_string);
            }
            //put new_string(string+new_gap) in place of gap_start
            self.buffer
                .splice(self.gap_start..self.gap_start, new_string.chars());
            self.gap_start += string.len();
        } else {
            for (i, char_value) in string.chars().enumerate() {
                self.buffer[self.gap_start + i] = char_value;
            }
            self.gap_start += string.len();
            self.gap_size -= string.len();
        }
        self.length += string.len();
    }
}
