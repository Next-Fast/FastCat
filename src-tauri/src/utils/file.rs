use std::{
    fs::File,
    io::{BufReader, BufWriter},
    path::Path,
};

use serde::{de::DeserializeOwned, Serialize};

pub fn read_json<T: DeserializeOwned>(path: impl AsRef<Path>) -> eyre::Result<T> {
    let reader = File::open(path).map(BufReader::new)?;
    let result = serde_json::from_reader(reader)?;
    Ok(result)
}

pub fn write_json<T: Serialize + ?Sized>(path: impl AsRef<Path>, value: &T) -> eyre::Result<()> {
    let writer = File::create(path).map(BufWriter::new)?;
    serde_json::to_writer(writer, value)?;
    Ok(())
}
