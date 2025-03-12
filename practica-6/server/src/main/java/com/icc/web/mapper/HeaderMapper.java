/* (C)2025 */
package com.icc.web.mapper;

import com.icc.web.dto.HeaderDTO;
import com.icc.web.model.Header;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HeaderMapper {
    HeaderMapper INSTANCE = Mappers.getMapper(HeaderMapper.class);

    HeaderDTO headerToDto(Header header);

    Header dtoToHeader(HeaderDTO headerDTO);

    List<HeaderDTO> headersToDtos(List<Header> headers);

    List<Header> dtosToHeaders(List<HeaderDTO> headerDTOs);
}
