package com.icc.web.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import org.bson.types.ObjectId;

public class ObjectIdDeserializer extends JsonDeserializer<ObjectId> {
    @Override
    public ObjectId deserialize(
            JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException {
        return new ObjectId(jsonParser.getText());
    }
}
